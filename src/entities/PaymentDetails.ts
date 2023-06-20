import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";
import Employee from "./Employee";
@Entity()
export default class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  PaymentStatus: string;
  @Column()
  PaymentAmount: number;
  @Column()
  PaymentDate: string;

  @Column()
  employeeId: number;
 
}
