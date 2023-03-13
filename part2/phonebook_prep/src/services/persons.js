import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;

  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;

  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;

  return response.data;
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;

  return response.data;
}

let toExport = {
  findPersonIdx,
  findPersonId,
  getAll,
  create,
  update,
  deletePerson
};
export default toExport;
