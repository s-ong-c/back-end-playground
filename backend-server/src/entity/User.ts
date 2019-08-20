import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository
} from 'typeorm';
import DataLoader from 'dataloader';
import { generateToken } from '../lib/token';
import AuthToken from './AuthToken';

@Entity('users', {
  synchronize: true
})
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ unique: true, length: 255 })
  username!: string;

  @Index()
  @Column({ unique: true, length: 255 })
  email!: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ default: false })
  is_certified!: boolean;

  async generateUserToken() {
    const authToken = new AuthToken();
    authToken.fk_user_id = this.id;
    await getRepository(AuthToken).save(authToken);

    // refresh token is valid for 30days
    const refreshToken = await generateToken(
      {
        user_id: this.id,
        token_id: authToken.id
      },
      {
        subject: 'refresh_token',
        expiresIn: '30d'
      }
    );

    const accessToken = await generateToken(
      {
        user_id: this.id
      },
      {
        subject: 'access_token',
        expiresIn: '1h'
      }
    );

    return {
      refreshToken,
      accessToken
    };
  }

  async refreshUserToken(tokenId: string, refreshTokenExp: number, originalRefreshToken: string) {
    const now = new Date().getTime();
    const diff = refreshTokenExp * 1000 - now;
    console.log('refreshing..');
    let refreshToken = originalRefreshToken;
    // renew refresh token if remaining life is less than 15d
    if (diff < 1000 * 60 * 60 * 24 * 15) {
      console.log('refreshing refreshToken');
      refreshToken = await generateToken(
        {
          user_id: this.id,
          token_id: tokenId
        },
        {
          subject: 'refresh_token',
          expiresIn: '30d'
        }
      );
    }
    const accessToken = await generateToken(
      {
        user_id: this.id
      },
      {
        subject: 'access_token',
        expiresIn: '1h'
      }
    );

    return { refreshToken, accessToken };
  }
}

export const userLoader: DataLoader<string, User> = new DataLoader<string, User>(ids => {
  const repo = getRepository(User);
  const users = repo.findByIds(ids);
  return users;
});
