import patients from "../data/patients";
import { NewPatientEntry, NonSensitivePatientData, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, 
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: entries
  }));
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (data: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: string = uuid();

  patients.push();
  const newPatient: Patient =  {
    id: id,
    ...data
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  findById,
  getNonSensitivePatientData
};