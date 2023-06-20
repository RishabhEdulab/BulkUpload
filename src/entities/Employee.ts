import { PrimaryGeneratedColumn,Column,OneToOne, Entity } from "typeorm";
@Entity()
export default class Employee{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    email:string
    @Column()
    age:number
}