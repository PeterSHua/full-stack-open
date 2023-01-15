import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = async () => {
  const response = await axios.get(baseURL);

  return response.data;
};

const create = async (contact) => {
  const response = await axios.post(baseURL, contact);

  return response.data;
};

const update = async (id, contact) => {
  const response = await axios.put(`${baseURL}/${id}`, contact);

  return response.data;
};

const deleteContact = async (id) => {
  await axios.delete(`${baseURL}/${id}`);
};

const exported = { getAll, create, update, deleteContact };
export default exported;
