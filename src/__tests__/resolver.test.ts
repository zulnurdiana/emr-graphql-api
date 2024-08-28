import { ApolloError } from "apollo-server";
import { resolvers } from "../resolver";
import { Manager } from "../lib/Manager";
import { Patient } from "../entity/patient.entity";
import { Doctor } from "../entity/Doctor.entity";
import { Appointment } from "../entity/Appointment.entity";
import { MedicalHistory } from "../entity/MedicalHistory.entity";
import { Medication } from "../entity/Medication.entity";
import { ContactInfo } from "../entity/ContactInfo.entity";
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
  ResolverFn,
} from "../types";

jest.mock("../lib/Manager");

describe("Query Resolvers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Patient", () => {
    it("should return a patient if found", async () => {
      const patientData = {
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        appointments: [],
        contactInfo: {},
        medicalHistory: [],
        medications: [],
      };
      jest.spyOn(Manager, "findOne").mockResolvedValue(patientData);

      const args: QueryPatientArgs = { id: "13" };
      const result = await (
        resolvers.Query!.Patient! as ResolverFn<any, any, any, any>
      )(null, args, {} as any, {} as any);

      expect(result).toEqual(patientData);
      expect(Manager.findOne).toHaveBeenCalledWith(Patient, {
        where: { id: args.id },
        relations: [
          "appointments",
          "contactInfo",
          "medicalHistory",
          "medications",
        ],
      });
    });

    it("should throw an error if patient not found", async () => {
      jest.spyOn(Manager, "findOne").mockResolvedValue(null);

      const args: QueryPatientArgs = { id: "13" };

      await expect(
        (resolvers.Query!.Patient! as ResolverFn<any, any, any, any>)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Patient not found", "PATIENT_NOT_FOUND")
      );
    });

    it("should throw an error if there is an issue fetching patient info", async () => {
      jest
        .spyOn(Manager, "findOne")
        .mockRejectedValue(new Error("Database error"));

      const args: QueryPatientArgs = { id: "13" };

      await expect(
        (resolvers.Query!.Patient! as ResolverFn<any, any, any, any>)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to fetch patient info.", "FETCH_FAILED")
      );
    });
  });

  describe("Doctor", () => {
    it("should return a doctor if found", async () => {
      const doctorData = {
        id: "4",
        name: "Kayla Kayden",
        appointments: [],
      };
      jest.spyOn(Manager, "findOne").mockResolvedValue(doctorData);
      const args: QueryDoctorArgs = { id: "3" };
      const result = await (
        resolvers.Query!.Doctor! as ResolverFn<any, any, any, any>
      )(null, args, {} as any, {} as any);

      expect(result).toEqual(doctorData);
      expect(Manager.findOne).toHaveBeenCalledWith(Doctor, {
        where: { id: args.id },
        relations: ["appointments"],
      });
    });

    it("should throw an error if doctor not found", async () => {
      jest.spyOn(Manager, "findOne").mockResolvedValue(null);

      const args: QueryDoctorArgs = { id: "3" };

      await expect(
        (resolvers.Query!.Doctor! as ResolverFn<any, any, any, any>)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to fetch doctor info.", "DOCTOR_NOT_FOUND")
      );
    });

    it("should throw an error if there is an issue fetching patient info", async () => {
      jest
        .spyOn(Manager, "findOne")
        .mockRejectedValue(new Error("Database error"));

      const args: QueryMedicalArgs = { id: "3" };

      await expect(
        (resolvers.Query!.Doctor! as ResolverFn<any, any, any, any>)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to fetch doctor info.", "FETCH_FAILED")
      );
    });
  });

  describe("Medical", () => {
    it("should return a patient if found", async () => {
      const patientData = {
        id: "13",
        firstName: "John",
        lastName: "Doe",
        medicalHistory: [],
        medications: [],
      };
      jest.spyOn(Manager, "findOne").mockResolvedValue(patientData);

      const args: QueryMedicalArgs = { id: "13" };
      const result = await (
        resolvers.Query!.Medical! as ResolverFn<any, any, any, any>
      )(null, args, {} as any, {} as any);

      expect(result).toEqual(patientData);
      expect(Manager.findOne).toHaveBeenCalledWith(Patient, {
        where: { id: args.id },
        relations: ["medicalHistory", "medications"],
      });
    });

    it("should throw an error if patient not found", async () => {
      jest.spyOn(Manager, "findOne").mockResolvedValue(null);

      const args: QueryMedicalArgs = { id: "13" };

      await expect(
        (resolvers.Query!.Medical! as ResolverFn<any, any, any, any>)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to fetch medical patient info.",
          "PATIENT_NOT_FOUND"
        )
      );
    });

    it("should throw an error if there is an issue fetching patient info", async () => {
      jest
        .spyOn(Manager, "findOne")
        .mockRejectedValue(new Error("Database error"));

      const args: QueryMedicalArgs = { id: "13" };

      await expect(
        (resolvers.Query!.Medical! as ResolverFn<any, any, any, any>)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to fetch medical patient info.", "FETCH_FAILED")
      );
    });
  });
});

describe("Patient Mutations", () => {
  describe("createPatient", () => {
    it("should create and return a patient", async () => {
      const contactInfo = { phone: "123456789", email: "john@example.com" };
      const newPatient = {
        dateOfBirth: "1990-01-01",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        contactInfo,
      };

      jest
        .spyOn(Manager, "save")
        .mockImplementation((entity: any, data: any) => {
          if (entity === ContactInfo) {
            return Promise.resolve(contactInfo);
          }
          if (entity === Patient) {
            return Promise.resolve({ ...data, contactInfo });
          }
          return Promise.resolve(data);
        });

      const args: MutationCreatePatientArgs = {
        dateOfBirth: "1990-01-01",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        contactInfo,
      };

      const result = await (resolvers.Mutation!.createPatient! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(newPatient);
    });

    it("should throw an error if patient creation fails", async () => {
      jest
        .spyOn(Manager, "save")
        .mockRejectedValue(new Error("Creation error"));

      const args: MutationCreatePatientArgs = {
        contactInfo: { phone: "123456789", email: "john@example.com" },
        dateOfBirth: "1990-01-01",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
      };

      await expect(
        (resolvers.Mutation!.createPatient! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to create patient.", "PATIENT_CREATION_FAILED")
      );
    });
  });

  describe("updatePatient", () => {
    it("should update and return a patient", async () => {
      const updatedPatient = {
        id: "13",
        contactInfo: {
          id: "contactId",
        },
        dateOfBirth: "1990-01-01",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Patient && criteria.id === "13") {
            return Promise.resolve({
              id: "13",
              contactInfo: { id: "contactId" },
              dateOfBirth: "1990-01-01",
              firstName: "John",
              lastName: "Doe",
              gender: "Male",
            });
          }
          if (entity === ContactInfo && criteria.id === "contactId") {
            return Promise.resolve({
              id: "contactId",
              phone: "987654321",
              email: "john.doe@example.com",
            });
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "update")
        .mockImplementation((entity: any, id: any, data: any) => {
          return Promise.resolve(data);
        });

      const args: MutationUpdatePatientArgs = {
        id: "13",
        patient: {
          dateOfBirth: "1990-01-01",
          firstName: "John",
          lastName: "Doe",
          gender: "Male",
        },
        contact: { phone: "987654321", email: "john.doe@example.com" },
      };

      const result = await (resolvers.Mutation!.updatePatient! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(updatedPatient);
    });

    it("should throw an error if patient update fails", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Patient && criteria.id === "13") {
            return Promise.resolve({
              id: "13",
              contactInfo: { id: "contactId" },
            });
          }
          if (entity === ContactInfo && criteria.id === "contactId") {
            return Promise.resolve({
              id: "contactId",
            });
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "update")
        .mockRejectedValue(new Error("Update error"));

      const args: MutationUpdatePatientArgs = {
        id: "13",
        patient: {
          dateOfBirth: "1990-01-01",
          firstName: "John",
          lastName: "Doe",
          gender: "Male",
        },
        contact: { phone: "987654321", email: "john.doe@example.com" },
      };

      await expect(
        (resolvers.Mutation!.updatePatient! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to update patient.", "PATIENT_UPDATE_FAILED")
      );
    });
  });

  describe("deletePatient", () => {
    it("should delete and return a patient", async () => {
      const deletedPatient = {
        id: "13",
        contactInfo: { id: "contactId" },
        dateOfBirth: "1990-01-01",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Patient && criteria.id === "13") {
            return Promise.resolve(deletedPatient);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "remove")
        .mockImplementation((entity: any, data: any) => {
          return Promise.resolve(data);
        });

      const args: MutationDeletePatientArgs = {
        id: "13",
      };

      const result = await (resolvers.Mutation!.deletePatient! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(deletedPatient);
    });

    it("should throw an error if patient not found", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          return Promise.resolve(null);
        });

      const args: MutationDeletePatientArgs = {
        id: "13",
      };

      await expect(
        (resolvers.Mutation!.deletePatient! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to delete patient.", "PATIENT_NOT_FOUND")
      );
    });

    it("should throw an error if deletion fails", async () => {
      const existingPatient = {
        id: "13",
        contactInfo: { id: "contactId" },
        dateOfBirth: "1990-01-01",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Patient && criteria.id === "13") {
            return Promise.resolve(existingPatient);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "remove")
        .mockRejectedValue(new Error("Deletion error"));

      const args: MutationDeletePatientArgs = {
        id: "13",
      };

      await expect(
        (resolvers.Mutation!.deletePatient! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to delete patient.", "PATIENT_DELETE_FAILED")
      );
    });
  });
});

describe("Doctor Mutations", () => {
  describe("createDoctor", () => {
    it("should create and return a doctor", async () => {
      const newDoctor = {
        name: "Dr. Smith",
      };

      jest
        .spyOn(Manager, "save")
        .mockImplementation((entity: any, data: any) => {
          if (entity === Doctor) {
            return Promise.resolve(data);
          }
          return Promise.resolve(data);
        });

      const args: MutationCreateDoctorArgs = {
        name: "Dr. Smith",
      };

      const result = await (resolvers.Mutation!.createDoctor! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(newDoctor);
    });

    it("should throw an error if doctor creation fails", async () => {
      jest
        .spyOn(Manager, "save")
        .mockRejectedValue(new Error("Creation error"));

      const args: MutationCreateDoctorArgs = {
        name: "Dr. Smith",
      };

      await expect(
        (resolvers.Mutation!.createDoctor! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to create doctor.", "DOCTOR_CREATION_FAILED")
      );
    });
  });

  describe("updateDoctor", () => {
    it("should update and return a doctor", async () => {
      const updatedDoctor = {
        id: "1",
        name: "Dr. Smith Updated",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "1") {
            return Promise.resolve({
              id: "1",
              name: "Dr. Smith",
            });
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "save")
        .mockImplementation((entity: any, data: any) => {
          return Promise.resolve(data);
        });

      const args: MutationUpdateDoctorArgs = {
        id: "1",
        name: "Dr. Smith Updated",
      };

      const result = await (resolvers.Mutation!.updateDoctor! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(updatedDoctor);
    });

    it("should throw an error if doctor not found", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          return Promise.resolve(null);
        });

      const args: MutationUpdateDoctorArgs = {
        id: "1",
        name: "Dr. Smith Updated",
      };

      await expect(
        (resolvers.Mutation!.updateDoctor! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to updating doctor.", "DOCTOR_UPDATING_FAILED")
      );
    });

    it("should throw an error if doctor update fails", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "1") {
            return Promise.resolve({
              id: "1",
              name: "Dr. Smith",
            });
          }
          return Promise.resolve(null);
        });

      jest.spyOn(Manager, "save").mockRejectedValue(new Error("Update error"));

      const args: MutationUpdateDoctorArgs = {
        id: "1",
        name: "Dr. Smith Updated",
      };

      await expect(
        (resolvers.Mutation!.updateDoctor! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to updating doctor.", "DOCTOR_CREATION_FAILED")
      );
    });
  });

  describe("deleteDoctor", () => {
    it("should delete and return a doctor", async () => {
      const deletedDoctor = {
        id: "1",
        name: "Dr. Smith",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "1") {
            return Promise.resolve(deletedDoctor);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "remove")
        .mockImplementation((entity: any, data: any) => {
          return Promise.resolve(data);
        });

      const args: MutationDeleteDoctorArgs = {
        id: "1",
      };

      const result = await (resolvers.Mutation!.deleteDoctor! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(deletedDoctor);
    });

    it("should throw an error if doctor not found", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          return Promise.resolve(null);
        });

      const args: MutationDeleteDoctorArgs = {
        id: "1",
      };

      await expect(
        (resolvers.Mutation!.deleteDoctor! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to delete doctor.", "DOCTOR_DELETE_FAILED")
      );
    });

    it("should throw an error if deletion fails", async () => {
      const existingDoctor = {
        id: "1",
        name: "Dr. Smith",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "1") {
            return Promise.resolve(existingDoctor);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "remove")
        .mockRejectedValue(new Error("Deletion error"));

      const args: MutationDeleteDoctorArgs = {
        id: "1",
      };

      await expect(
        (resolvers.Mutation!.deleteDoctor! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError("Failed to delete doctor.", "DOCTOR_DELETE_FAILED")
      );
    });
  });
});

describe("Appointment Mutations", () => {
  describe("createAppointment", () => {
    it("should create and return an appointment", async () => {
      const doctorEntity = {
        id: "doc-1",
        name: "Dr. Smith",
      };
      const patientEntity = {
        id: "pat-1",
        name: "John Doe",
        appointments: [],
      };
      const newAppointment = {
        id: "app-1",
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        doctor: doctorEntity,
        patient: patientEntity,
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "doc-1") {
            return Promise.resolve(doctorEntity);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "findOne")
        .mockImplementation((entity: any, options: any) => {
          if (entity === Patient && options.where.id === "pat-1") {
            return Promise.resolve(patientEntity);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "save")
        .mockImplementation((entity: any, data: any) => {
          if (entity === Appointment) {
            return Promise.resolve(newAppointment);
          }
          return Promise.resolve(data);
        });

      const args: MutationCreateAppointmentArgs = {
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        patientId: "pat-1",
        doctorId: "doc-1",
      };

      const result = await (resolvers.Mutation!.createAppointment! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(newAppointment);
    });

    it("should throw an error if doctor is not found", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "doc-1") {
            return Promise.resolve(null);
          }
          return Promise.resolve(null);
        });

      const args: MutationCreateAppointmentArgs = {
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        patientId: "pat-1",
        doctorId: "doc-1",
      };

      await expect(
        (resolvers.Mutation!.createAppointment! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create appointment.",
          "APPOINTMENT_CREATION_FAILED"
        )
      );
    });

    it("should throw an error if patient is not found", async () => {
      const doctorEntity = {
        id: "doc-1",
        name: "Dr. Smith",
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "doc-1") {
            return Promise.resolve(doctorEntity);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "findOne")
        .mockImplementation((entity: any, options: any) => {
          if (entity === Patient && options.where.id === "pat-1") {
            return Promise.resolve(null);
          }
          return Promise.resolve(null);
        });

      const args: MutationCreateAppointmentArgs = {
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        patientId: "pat-1",
        doctorId: "doc-1",
      };

      await expect(
        (resolvers.Mutation!.createAppointment! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create appointment.",
          "APPOINTMENT_CREATION_FAILED"
        )
      );
    });

    it("should throw an error if appointment creation fails", async () => {
      const doctorEntity = {
        id: "doc-1",
        name: "Dr. Smith",
      };
      const patientEntity = {
        id: "pat-1",
        name: "John Doe",
        appointments: [],
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Doctor && criteria.id === "doc-1") {
            return Promise.resolve(doctorEntity);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "findOne")
        .mockImplementation((entity: any, options: any) => {
          if (entity === Patient && options.where.id === "pat-1") {
            return Promise.resolve(patientEntity);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "save")
        .mockRejectedValue(new Error("Creation error"));

      const args: MutationCreateAppointmentArgs = {
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        patientId: "pat-1",
        doctorId: "doc-1",
      };

      await expect(
        (resolvers.Mutation!.createAppointment! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create appointment.",
          "APPOINTMENT_CREATION_FAILED"
        )
      );
    });
  });

  describe("disableAppointment", () => {
    it("should disable and return an appointment", async () => {
      const existingAppointment = {
        id: "app-1",
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        doctor: { id: "doc-1" },
        patient: { id: "pat-1" },
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Appointment && criteria.id === "app-1") {
            return Promise.resolve(existingAppointment);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "remove")
        .mockImplementation((entity: any, data: any) => {
          return Promise.resolve(data);
        });

      const args: MutationDisableAppointmentArgs = {
        id: "app-1",
      };

      const result = await (resolvers.Mutation!.disableAppointment! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual(existingAppointment);
    });

    it("should throw an error if appointment is not found", async () => {
      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Appointment && criteria.id === "app-1") {
            return Promise.resolve(null);
          }
          return Promise.resolve(null);
        });

      const args: MutationDisableAppointmentArgs = {
        id: "app-1",
      };

      await expect(
        (resolvers.Mutation!.disableAppointment! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to disable appointment.",
          "APPOINTMENT_DISABLE_FAILED"
        )
      );
    });

    it("should throw an error if appointment disable fails", async () => {
      const existingAppointment = {
        id: "app-1",
        date: "2024-08-28",
        reason: "Regular Checkup",
        notes: "All good",
        doctor: { id: "doc-1" },
        patient: { id: "pat-1" },
      };

      jest
        .spyOn(Manager, "findOneBy")
        .mockImplementation((entity: any, criteria: any) => {
          if (entity === Appointment && criteria.id === "app-1") {
            return Promise.resolve(existingAppointment);
          }
          return Promise.resolve(null);
        });

      jest
        .spyOn(Manager, "remove")
        .mockRejectedValue(new Error("Disable error"));

      const args: MutationDisableAppointmentArgs = {
        id: "app-1",
      };

      await expect(
        (resolvers.Mutation!.disableAppointment! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to disable appointment.",
          "APPOINTMENT_DISABLE_FAILED"
        )
      );
    });
  });
});

describe("MedicalHistory Mutations", () => {
  describe("createMedicalHistory", () => {
    it("should create and return medical history", async () => {
      const patientEntity = {
        id: "pat-1",
        name: "John Doe",
      };

      jest.spyOn(Manager, "findOneBy").mockResolvedValue(patientEntity);
      jest.spyOn(Manager, "save").mockResolvedValue({
        id: "med-1",
        condition: "Diabetes",
        diagnosisDate: "2024-08-01",
        status: "Active",
        patient: patientEntity,
      });

      const args = {
        condition: "Diabetes",
        diagnosisDate: "2024-08-01",
        status: "Active",
        patientId: "pat-1",
      };

      const result = await (resolvers.Mutation!.createMedicalHistory! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual({
        id: "med-1",
        condition: "Diabetes",
        diagnosisDate: "2024-08-01",
        status: "Active",
        patient: patientEntity,
      });
    });

    it("should throw an error if patient is not found", async () => {
      jest.spyOn(Manager, "findOneBy").mockResolvedValue(null);

      const args = {
        condition: "Diabetes",
        diagnosisDate: "2024-08-01",
        status: "Active",
        patientId: "pat-1",
      };

      await expect(
        (resolvers.Mutation!.createMedicalHistory! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create medical history.",
          "MEDICALHISTORY_CREATION_FAILED"
        )
      );
    });

    it("should throw an error if saving medical history fails", async () => {
      const patientEntity = {
        id: "pat-1",
        name: "John Doe",
      };

      jest.spyOn(Manager, "findOneBy").mockResolvedValue(patientEntity);
      jest.spyOn(Manager, "save").mockRejectedValue(new Error("Saving failed"));

      const args = {
        condition: "Diabetes",
        diagnosisDate: "2024-08-01",
        status: "Active",
        patientId: "pat-1",
      };

      await expect(
        (resolvers.Mutation!.createMedicalHistory! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create medical history.",
          "MEDICALHISTORY_CREATION_FAILED"
        )
      );
    });
  });
});

describe("Medication Mutations", () => {
  describe("createMedication", () => {
    it("should create and return medication", async () => {
      const patientEntity = {
        id: "pat-1",
        name: "John Doe",
      };

      jest.spyOn(Manager, "findOneBy").mockResolvedValue(patientEntity);
      jest.spyOn(Manager, "save").mockResolvedValue({
        id: "med-1",
        name: "Aspirin",
        dosage: "500mg",
        frequency: "Once a day",
        patient: patientEntity,
      });

      const args = {
        name: "Aspirin",
        dosage: "500mg",
        frequency: "Once a day",
        patientId: "pat-1",
      };

      const result = await (resolvers.Mutation!.createMedication! as any)(
        null,
        args,
        {} as any,
        {} as any
      );

      expect(result).toEqual({
        id: "med-1",
        name: "Aspirin",
        dosage: "500mg",
        frequency: "Once a day",
        patient: patientEntity,
      });
    });

    it("should throw an error if patient is not found", async () => {
      jest.spyOn(Manager, "findOneBy").mockResolvedValue(null);

      const args = {
        name: "Aspirin",
        dosage: "500mg",
        frequency: "Once a day",
        patientId: "pat-1",
      };

      await expect(
        (resolvers.Mutation!.createMedication! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create medical history.",
          "MEDICALHISTORY_CREATION_FAILED"
        )
      );
    });

    it("should throw an error if saving medication fails", async () => {
      const patientEntity = {
        id: "pat-1",
        name: "John Doe",
      };

      jest.spyOn(Manager, "findOneBy").mockResolvedValue(patientEntity);
      jest.spyOn(Manager, "save").mockRejectedValue(new Error("Saving failed"));

      const args = {
        name: "Aspirin",
        dosage: "500mg",
        frequency: "Once a day",
        patientId: "pat-1",
      };

      await expect(
        (resolvers.Mutation!.createMedication! as any)(
          null,
          args,
          {} as any,
          {} as any
        )
      ).rejects.toThrow(
        new ApolloError(
          "Failed to create medical history.",
          "MEDICALHISTORY_CREATION_FAILED"
        )
      );
    });
  });
});
