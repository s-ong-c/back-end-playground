import {Entity, PrimaryGeneratedColumn, Column,Index} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    usrname: string;

    @Index()
    @Column()
    email: string;
    
    @Column()
    is_certified: boolean;
}
