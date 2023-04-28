import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatient,
  Patient,
  NewPatient
} from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getAPatient = (id : string): Patient | undefined => {
  return patients.find((p) => p.id === id)
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getAPatient,
  getNonSensitivePatients,
  addPatient
};
