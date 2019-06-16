import {
    AllowNull,
    Column,
    Default,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { generateToken } from '../lib/token';
  
  @Table({
    timestamps: true,
  })
  export class User extends Model<User> {
    @AllowNull(false)
    @Column
    username!: string;
  
    @Default('/static/images/default_thumbnail.png')
    @Column
    thumbnail?: string;
  
    @Column
    email!: string;
  
    @AllowNull(false)
    @Column
    provider!: string;
  
    @AllowNull(false)
    @Column
    snsId!: string;
  
    @Column
    description?: string;
  
    // @HasMany(() => Post)
    // posts?: Post[];
  
    public get profile(): object {
      return {
        id: this.id,
        thumbnail: this.thumbnail,
        username: this.username,
      };
    }
  
    public generateToken() {
      const payload = {
        profile: this.profile,
      };
      return generateToken(payload);
    }
  }
  