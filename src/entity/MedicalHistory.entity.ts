import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Patient } from "./patient.entity";

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  id!: string
  @Column()
  condition!: string;

  @Column()
  diagnosisDate!: string;

  @Column()
  status!: string;

  @ManyToOne(() => Patient, (patient) => patient.medicalHistory, {
    onDelete: "CASCADE",
  })
  patient!: Patient;
}
