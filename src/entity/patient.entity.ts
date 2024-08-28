import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Appointment } from "./Appointment.entity";
import { MedicalHistory } from "./MedicalHistory.entity";
import { Medication } from "./Medication.entity";
import { ContactInfo } from "./ContactInfo.entity";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  dateOfBirth!: string;

  @Column()
  gender!: string;

  @OneToOne(() => ContactInfo, { eager: true })
  @JoinColumn()
  contactInfo!: Relation<ContactInfo>;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Relation<Appointment>[];

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistory!: Relation<MedicalHistory>[];

  @OneToMany(() => Medication, (medication) => medication.patient)
  medications!: Relation<Medication>[];
}
