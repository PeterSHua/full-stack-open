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

const findPersonIdx = (id, persons) => {
  for (let idx = 0; idx < persons.length; idx += 1) {
    if (persons[idx].id === id) {
      return idx;
    }
  }

  return -1;
};

const findPersonId = (name, persons) => {
  for (let idx = 0; idx < persons.length; idx +=1) {
    if (persons[idx].name === name) {
      return persons[idx].id;
    }
  }

  return -1;
}

const exported = {
  getAll,
  create,
  update,
  deleteContact,
  findPersonIdx,
  findPersonId
};
export default exported;
