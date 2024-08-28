import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import { Doctor } from "./Doctor.entity";
import { Patient } from "./patient.entity";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  date!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
  doctor!: Relation<Doctor>;

  @Column()
  reason!: string;

  @Column({ nullable: true })
  notes!: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: "CASCADE",
  })
  patient!: Patient;
}
