import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column({unique:true})
    userid: string;

    @Column({nullable:false})
    password: string;

    @Column({unique:true})
    usermobile: string;

    @Column()
    organization: string;
}