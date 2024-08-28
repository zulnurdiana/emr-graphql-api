import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Patient } from "./patient.entity";

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  dosage!: string;

  @Column()
  frequency!: string;

  @ManyToOne(() => Patient, (patient) => patient.medications, {
    onDelete: "CASCADE",
  })
  patient!: Patient;
}
