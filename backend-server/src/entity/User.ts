import {Entity, PrimaryGeneratedColumn, Column,Index, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index()
    @Column({ unique: true, length: 255 })
    usrname!: string;

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
}
