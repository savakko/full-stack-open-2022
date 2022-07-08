import axios from 'axios'

const basepath = 'http://localhost:3001/api/persons'

const getPersons = async () => {
  return axios.get(basepath).then(response => response.data)
}

const postPerson = async (person) => {
  return axios.post(basepath, person).then(response => response.data)
}

const updatePerson = async (person) => {
  return axios.put(`${basepath}/${person.id}`, person).then(response => response.data)
}

const deletePerson = async (person) => {
  return axios.delete(`${basepath}/${person.id}`).then(response => response.data)
}

const db = { getPersons, postPerson, updatePerson, deletePerson }
export default db
