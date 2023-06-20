import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";
import Employee from "./Employee";
@Entity()
export default class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  address: string;
  @Column()
  employeeId: number;
 
}
