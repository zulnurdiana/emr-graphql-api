import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Patient } from "./patient.entity";

@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn()
  id!: string; // Use definite assignment assertion

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @OneToOne(() => Patient, (patient) => patient.contactInfo)
  patient!: Patient; // Use definite assignment assertion
}
