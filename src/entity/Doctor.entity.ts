import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";
import { Appointment } from "./Appointment.entity";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments!: Relation<Appointment>[];
}
