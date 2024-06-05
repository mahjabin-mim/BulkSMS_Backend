import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('history')
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    ownerid: string;
    
    @Column()
    message: string;

    @Column({nullable:false})
    to: string;

    @Column()
    datetime: string;

    @Column({nullable:false})
    status: string;
}