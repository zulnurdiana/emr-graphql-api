import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

import { Patient } from "./entity/patient.entity";
import { Doctor } from "./entity/Doctor.entity";
import { Appointment } from "./entity/Appointment.entity";
import { MedicalHistory } from "./entity/MedicalHistory.entity";
import { Medication } from "./entity/Medication.entity";
import { ContactInfo } from "./entity/ContactInfo.entity";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Patient,
    Doctor,
    Appointment,
    MedicalHistory,
    Medication,
    ContactInfo,
  ],
});
