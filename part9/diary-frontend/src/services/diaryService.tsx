import axios from 'axios';
import { Entry, NewEntry } from "../types";

const baseUrl = 'http://localhost:3001';

const getAllEntries = async () => {
  const response = await axios.get<Entry[]>(`${baseUrl}/api/diaries`)

  return response.data;
}

const createEntry = async (object: NewEntry) => {
  const response = await axios.post<Entry>(`${baseUrl}/api/diaries`, object);

  return response.data;
}

export default {
  getAllEntries,
  createEntry
}
