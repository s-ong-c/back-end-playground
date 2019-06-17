import bcrypt from 'bcrypt';
import {
    AllowNull,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
  } from 'sequelize-typescript';
  import { generateToken } from '../lib/token';
  @Table({
    timestamps: true,
  })
  export class User extends Model<User> {
        
      @PrimaryKey
      @Default(DataType.UUIDV1)
      @Column(DataType.UUID)
      id! : string;

     @AllowNull(false)
    @Column
    username!: string;

    @AllowNull(false)
    @Column
    public password!: string;
  
    @Default('/static/images/default_thumbnail.png')
    @Column
    thumbnail?: string;
  
    @Column
    email!: string;
    // @HasMany(() => Post)
    // posts?: Post[];

    public static crypt(password: string): Promise<string> {
        const saltRounds: number = 10;
        return bcrypt.hash(password, saltRounds);  
    }

   public static findUser(type: 'email' | 'username', value: string){
        return User.findOne({ where: { [type]: value } });
    }


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
    public validatePassword(password_hash:string): Promise<boolean>{
        const {password} = {
            password: this.password,
          };
        return bcrypt.compare(password_hash, password);
     }
  }
  