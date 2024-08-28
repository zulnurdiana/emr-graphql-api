import { ApolloError } from "apollo-server";
import { Appointment } from "./entity/Appointment.entity";
import { ContactInfo } from "./entity/ContactInfo.entity";
import { Doctor } from "./entity/Doctor.entity";
import { Patient } from "./entity/patient.entity";
import { Manager } from "./lib/Manager";
import { MedicalHistory } from "./entity/MedicalHistory.entity";
import { Medication } from "./entity/Medication.entity";
import { Resolvers } from "./types";
import {
  MutationCreateAppointmentArgs,
  MutationCreatePatientArgs,
  MutationCreateDoctorArgs,
  MutationUpdateDoctorArgs,
  MutationUpdatePatientArgs,
  MutationDisableAppointmentArgs,
  MutationDeletePatientArgs,
  MutationDeleteDoctorArgs,
  MutationCreateMedicalHistoryArgs,
  MutationCreateMedicationArgs,
  QueryPatientArgs,
  QueryDoctorArgs,
  QueryMedicalArgs,
} from "./types";

export const resolvers: Resolvers = {
  Query: {
    async Patient(_: any, args: QueryPatientArgs): Promise<Patient> {
      try {
        const { id } = args;
        const patient = await Manager.findOne(Patient, {
          where: { id: id },
          relations: [
            "appointments",
            "contactInfo",
            "medicalHistory",
            "medications",
          ],
        });

        if (patient) {
          return patient;
        } else {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }
      } catch (error) {
        if (error instanceof ApolloError) {
          throw error;
        } else {
          console.error("Error fetching patient info:", error);
          throw new ApolloError(
            "Failed to fetch patient info.",
            "FETCH_FAILED"
          );
        }
      }
    },
    async Doctor(_, args: QueryDoctorArgs): Promise<Doctor> {
      try {
        const singleDoctor = await Manager.findOne(Doctor, {
          where: { id: args.id },
          relations: ["appointments"],
        });
        if (singleDoctor) {
          return singleDoctor;
        } else {
          throw new ApolloError("Doctor not found", "DOCTOR_NOT_FOUND");
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
        throw new ApolloError("Failed to fetch doctor info.", "FETCH_FAILED");
      }
    },
    async Medical(_, args: QueryMedicalArgs): Promise<Patient> {
      try {
        const patient = await Manager.findOne(Patient, {
          where: { id: args.id },
          relations: ["medicalHistory", "medications"],
        });

        if (patient) {
          return patient;
        } else {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }
      } catch (error) {
        console.error("Error fetching medical patient info:", error);
        throw new ApolloError(
          "Failed to fetch medical patient info.",
          "FETCH_FAILED"
        );
      }
    },
  },

  Mutation: {
    async createPatient(_, args: MutationCreatePatientArgs): Promise<Patient> {
      try {
        const { contactInfo, ...patientData } = args;

        const newPatient = {
          ...patientData,
          contactInfo: await Manager.save(ContactInfo, contactInfo),
        };
        const savedPatient = await Manager.save(Patient, newPatient);

        return savedPatient;
      } catch (error) {
        console.error("Error creating patient:", error);
        throw new ApolloError(
          "Failed to create patient.",
          "PATIENT_CREATION_FAILED"
        );
      }
    },
    async updatePatient(_, args: MutationUpdatePatientArgs): Promise<Patient> {
      try {
        const { id, patient, contact } = args;

        const existingPatient = await Manager.findOneBy(Patient, { id });

        if (!existingPatient) {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }

        if (contact) {
          const existingContactInfo = await Manager.findOneBy(ContactInfo, {
            id: existingPatient.contactInfo.id,
          });

          if (existingContactInfo) {
            await Manager.update(ContactInfo, existingContactInfo.id, contact);
          }
        }

        if (patient) {
          await Manager.update(Patient, id, patient);
        }

        const updatedPatientRecord = await Manager.findOneBy(Patient, { id });

        if (!updatedPatientRecord) {
          throw new ApolloError(
            "Error retrieving updated patient",
            "RETRIEVE_FAILED"
          );
        }

        return updatedPatientRecord;
      } catch (error) {
        console.error("Error updating patient:", error);
        throw new ApolloError(
          "Failed to update patient.",
          "PATIENT_UPDATE_FAILED"
        );
      }
    },
    async deletePatient(_, args: MutationDeletePatientArgs): Promise<Patient> {
      try {
        const single_patient = await Manager.findOneBy(Patient, {
          id: args.id,
        });
        if (!single_patient) {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }

        await Manager.remove(Patient, single_patient);
        return single_patient;
      } catch (error) {
        console.error("Error delete patient:", error);
        throw new ApolloError(
          "Failed to delete patient.",
          "PATIENT_DELETE_FAILED"
        );
      }
    },

    async createDoctor(_, args: MutationCreateDoctorArgs): Promise<Doctor> {
      try {
        const newDoctor = {
          ...args,
        };
        const savedDoctor = await Manager.save(Doctor, newDoctor);

        return savedDoctor;
      } catch (error) {
        console.error("Error creating doctor:", error);
        throw new ApolloError(
          "Failed to create doctor.",
          "DOCTOR_CREATION_FAILED"
        );
      }
    },

    async updateDoctor(_, args: MutationUpdateDoctorArgs): Promise<Doctor> {
      try {
        const { id, name } = args;
        const singleDoctor = await Manager.findOneBy(Doctor, {
          id,
        });

        if (!singleDoctor) {
          throw new ApolloError("Doctor not found", "DOCTOR_NOT_FOUND");
        } else {
          singleDoctor.name = name;
          const savedDoctor = await Manager.save(Doctor, singleDoctor);
          return savedDoctor;
        }
      } catch (error) {
        console.error("Error updateding doctor:", error);
        throw new ApolloError(
          "Failed to updating doctor.",
          "DOCTOR_UPDATING_FAILED"
        );
      }
    },

    async deleteDoctor(_, args: MutationDeleteDoctorArgs): Promise<Doctor> {
      try {
        const single_doctor = await Manager.findOneBy(Doctor, {
          id: args.id,
        });
        if (!single_doctor) {
          throw new ApolloError("Doctor not found", "DOCTOR_NOT_FOUND");
        }

        await Manager.remove(Doctor, single_doctor);
        return single_doctor;
      } catch (error) {
        console.error("Error delete doctor:", error);
        throw new ApolloError(
          "Failed to delete doctor.",
          "DOCTOR_DELETE_FAILED"
        );
      }
    },

    async createAppointment(
      _,
      args: MutationCreateAppointmentArgs
    ): Promise<Appointment> {
      try {
        const { date, reason, notes, patientId, doctorId } = args;

        const doctorEntity = await Manager.findOneBy(Doctor, { id: doctorId });
        if (!doctorEntity) {
          throw new ApolloError("Doctor not found", "DOCTOR_NOT_FOUND");
        }

        const patientEntity = await Manager.findOne(Patient, {
          where: { id: patientId },
          relations: ["appointments"],
        });
        if (!patientEntity) {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }

        const newAppointment = await Manager.save(Appointment, {
          date,
          reason,
          notes: notes ?? "",
          doctor: doctorEntity,
          patient: patientEntity,
        });

        if (newAppointment) {
          return newAppointment;
        } else {
          throw new ApolloError(
            "Failed to create appointment",
            "APPOINTMENT_CREATION_FAILED"
          );
        }
      } catch (error) {
        console.error("Error creating appointment:", error);
        throw new ApolloError(
          "Failed to create appointment.",
          "APPOINTMENT_CREATION_FAILED"
        );
      }
    },
    async disableAppointment(
      _,
      args: MutationDisableAppointmentArgs
    ): Promise<Appointment> {
      try {
        const single_appointment = await Manager.findOneBy(Appointment, {
          id: args.id,
        });

        if (!single_appointment) {
          throw new ApolloError(
            "Appointment not found",
            "APPOINTMENT_NOT_FOUND"
          );
        }

        await Manager.remove(Appointment, single_appointment);
        return single_appointment;
      } catch (error) {
        console.error("Error disable appointment:", error);
        throw new ApolloError(
          "Failed to disable appointment.",
          "APPOINTMENT_DISABLE_FAILED"
        );
      }
    },
    async createMedicalHistory(
      _,
      args: MutationCreateMedicalHistoryArgs
    ): Promise<MedicalHistory> {
      try {
        const { condition, diagnosisDate, status, patientId } = args;

        const patientEntity = await Manager.findOneBy(Patient, {
          id: patientId,
        });

        if (!patientEntity) {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }
        const saved_medical_history = await Manager.save(MedicalHistory, {
          condition,
          diagnosisDate,
          status,
          patient: patientEntity,
        });
        return saved_medical_history;
      } catch (error) {
        console.error("Error creating medical history:", error);
        throw new ApolloError(
          "Failed to create medical history.",
          "MEDICALHISTORY_CREATION_FAILED"
        );
      }
    },
    async createMedication(
      _,
      args: MutationCreateMedicationArgs
    ): Promise<Medication> {
      try {
        const { name, dosage, frequency, patientId } = args;
        const patientEntity = await Manager.findOneBy(Patient, {
          id: patientId,
        });
        if (!patientEntity) {
          throw new ApolloError("Patient not found", "PATIENT_NOT_FOUND");
        }

        const saved_medication = await Manager.save(Medication, {
          name,
          dosage,
          frequency,
          patient: patientEntity,
        });
        return saved_medication;
      } catch (error) {
        console.error("Error creating medical history:", error);
        throw new ApolloError(
          "Failed to create medical history.",
          "MEDICALHISTORY_CREATION_FAILED"
        );
      }
    },
  },
};
