import { useState, useEffect } from "react";

import { Patient } from '../../types'
import patientService from "../../services/patients";

import { useParams } from 'react-router-dom'

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id

  const fetchPatient = async () => {
    if (!id) {
      return
    }

    const patient = await patientService.getOne(id);
    setPatient(patient);
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>invalid patient</div>
  }

  return (
    <div>
      <div>{patient.name} {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
