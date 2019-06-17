import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique,
  } from 'sequelize-typescript';
  import shortid from 'shortid';
  @Table({
    timestamps: true,
  })
  export class EmailAuth extends Model<EmailAuth> {
        
    @PrimaryKey
    @Default(DataType.UUIDV1)
    @Column(DataType.UUID)
      id! : string;
    
    @Unique
    @Default(shortid.generate)
    @Column
    code!: string;
    
    @Column
    email!: string;

    @Default(false)
    @Column
    logged!: boolean;

  public static findcode(code: string): Promise<any> {
        return EmailAuth.findOne({
                where: {
                    code,
                    logged: false,
                },
            });
    }
}