import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Appointment = {
  __typename?: 'Appointment';
  date: Scalars['String']['output'];
  doctor: Doctor;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  email: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type ContactInfoInput = {
  email: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type DeleteAppointmentResponse = {
  __typename?: 'DeleteAppointmentResponse';
  success: Scalars['Boolean']['output'];
};

export type Doctor = {
  __typename?: 'Doctor';
  appointments: Array<Maybe<Appointment>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type MedicalHistory = {
  __typename?: 'MedicalHistory';
  condition: Scalars['String']['output'];
  diagnosisDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};

export type Medication = {
  __typename?: 'Medication';
  dosage: Scalars['String']['output'];
  frequency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment?: Maybe<Appointment>;
  createDoctor?: Maybe<Doctor>;
  createMedicalHistory?: Maybe<MedicalHistory>;
  createMedication?: Maybe<Medication>;
  createPatient?: Maybe<Patient>;
  deleteDoctor?: Maybe<Doctor>;
  deletePatient?: Maybe<Patient>;
  disableAppointment?: Maybe<Appointment>;
  updateDoctor?: Maybe<Doctor>;
  updatePatient?: Maybe<Patient>;
};


export type MutationCreateAppointmentArgs = {
  date: Scalars['String']['input'];
  doctorId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  patientId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationCreateDoctorArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateMedicalHistoryArgs = {
  condition: Scalars['String']['input'];
  diagnosisDate: Scalars['String']['input'];
  patientId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationCreateMedicationArgs = {
  dosage: Scalars['String']['input'];
  frequency: Scalars['String']['input'];
  name: Scalars['String']['input'];
  patientId: Scalars['ID']['input'];
};


export type MutationCreatePatientArgs = {
  contactInfo: ContactInfoInput;
  dateOfBirth: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type MutationDeleteDoctorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePatientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableAppointmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateDoctorArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdatePatientArgs = {
  contact?: InputMaybe<ContactInfoInput>;
  id: Scalars['ID']['input'];
  patient: PatientInput;
};

export type Patient = {
  __typename?: 'Patient';
  appointments: Array<Maybe<Appointment>>;
  contactInfo: ContactInfo;
  dateOfBirth: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  medicalHistory: Array<Maybe<MedicalHistory>>;
  medications: Array<Maybe<Medication>>;
};

export type PatientInput = {
  dateOfBirth: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  Doctor?: Maybe<Doctor>;
  Medical?: Maybe<Patient>;
  Patient?: Maybe<Patient>;
};


export type QueryDoctorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMedicalArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPatientArgs = {
  id: Scalars['ID']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Appointment: ResolverTypeWrapper<Appointment>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ContactInfo: ResolverTypeWrapper<ContactInfo>;
  ContactInfoInput: ContactInfoInput;
  DeleteAppointmentResponse: ResolverTypeWrapper<DeleteAppointmentResponse>;
  Doctor: ResolverTypeWrapper<Doctor>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  MedicalHistory: ResolverTypeWrapper<MedicalHistory>;
  Medication: ResolverTypeWrapper<Medication>;
  Mutation: ResolverTypeWrapper<{}>;
  Patient: ResolverTypeWrapper<Patient>;
  PatientInput: PatientInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Appointment: Appointment;
  Boolean: Scalars['Boolean']['output'];
  ContactInfo: ContactInfo;
  ContactInfoInput: ContactInfoInput;
  DeleteAppointmentResponse: DeleteAppointmentResponse;
  Doctor: Doctor;
  ID: Scalars['ID']['output'];
  MedicalHistory: MedicalHistory;
  Medication: Medication;
  Mutation: {};
  Patient: Patient;
  PatientInput: PatientInput;
  Query: {};
  String: Scalars['String']['output'];
};

export type AppointmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Appointment'] = ResolversParentTypes['Appointment']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  doctor?: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactInfo'] = ResolversParentTypes['ContactInfo']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteAppointmentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteAppointmentResponse'] = ResolversParentTypes['DeleteAppointmentResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DoctorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Doctor'] = ResolversParentTypes['Doctor']> = {
  appointments?: Resolver<Array<Maybe<ResolversTypes['Appointment']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicalHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MedicalHistory'] = ResolversParentTypes['MedicalHistory']> = {
  condition?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  diagnosisDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Medication'] = ResolversParentTypes['Medication']> = {
  dosage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  frequency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAppointment?: Resolver<Maybe<ResolversTypes['Appointment']>, ParentType, ContextType, RequireFields<MutationCreateAppointmentArgs, 'date' | 'doctorId' | 'patientId' | 'reason'>>;
  createDoctor?: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType, RequireFields<MutationCreateDoctorArgs, 'name'>>;
  createMedicalHistory?: Resolver<Maybe<ResolversTypes['MedicalHistory']>, ParentType, ContextType, RequireFields<MutationCreateMedicalHistoryArgs, 'condition' | 'diagnosisDate' | 'patientId' | 'status'>>;
  createMedication?: Resolver<Maybe<ResolversTypes['Medication']>, ParentType, ContextType, RequireFields<MutationCreateMedicationArgs, 'dosage' | 'frequency' | 'name' | 'patientId'>>;
  createPatient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, RequireFields<MutationCreatePatientArgs, 'contactInfo' | 'dateOfBirth' | 'firstName' | 'gender' | 'lastName'>>;
  deleteDoctor?: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType, RequireFields<MutationDeleteDoctorArgs, 'id'>>;
  deletePatient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, RequireFields<MutationDeletePatientArgs, 'id'>>;
  disableAppointment?: Resolver<Maybe<ResolversTypes['Appointment']>, ParentType, ContextType, RequireFields<MutationDisableAppointmentArgs, 'id'>>;
  updateDoctor?: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType, RequireFields<MutationUpdateDoctorArgs, 'id' | 'name'>>;
  updatePatient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, RequireFields<MutationUpdatePatientArgs, 'id' | 'patient'>>;
};

export type PatientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Patient'] = ResolversParentTypes['Patient']> = {
  appointments?: Resolver<Array<Maybe<ResolversTypes['Appointment']>>, ParentType, ContextType>;
  contactInfo?: Resolver<ResolversTypes['ContactInfo'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  medicalHistory?: Resolver<Array<Maybe<ResolversTypes['MedicalHistory']>>, ParentType, ContextType>;
  medications?: Resolver<Array<Maybe<ResolversTypes['Medication']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Doctor?: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType, RequireFields<QueryDoctorArgs, 'id'>>;
  Medical?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, RequireFields<QueryMedicalArgs, 'id'>>;
  Patient?: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType, RequireFields<QueryPatientArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Appointment?: AppointmentResolvers<ContextType>;
  ContactInfo?: ContactInfoResolvers<ContextType>;
  DeleteAppointmentResponse?: DeleteAppointmentResponseResolvers<ContextType>;
  Doctor?: DoctorResolvers<ContextType>;
  MedicalHistory?: MedicalHistoryResolvers<ContextType>;
  Medication?: MedicationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Patient?: PatientResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

