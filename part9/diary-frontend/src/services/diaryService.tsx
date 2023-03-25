import axios from 'axios';
import { Entry, NewEntry } from "../types";

const baseUrl = 'http://localhost:3001';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const getAllEntries = async () => {
  const response = await axios.get<Entry[]>(`${baseUrl}/api/diaries`)

  return response.data;
}

const createEntry = async (object: NewEntry) => {
  try {
    const response = await axios.post<Entry>(`${baseUrl}/api/diaries`, object);

    return response.data;
  } catch(error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      if (error.response) {
        return(error.response.data);
      }
    } else {
      console.error(error);
    }
  }
}

export default {
  getAllEntries,
  createEntry
}
