import diagnoses from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
