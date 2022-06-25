import axios from 'axios'

const getPersons = async () => {
  return axios.get('http://localhost:3001/persons').then(response => response.data)
}

const postPerson = async (person) => {
  return axios.post('http://localhost:3001/persons', person).then(response => response.data)
}

const updatePerson = async (person) => {
  return axios.put(`http://localhost:3001/persons/${person.id}`, person).then(response => response.data)
}

const deletePerson = async (person) => {
  return axios.delete(`http://localhost:3001/persons/${person.id}`).then(response => response.data)
}

const db = { getPersons, postPerson, updatePerson, deletePerson }
export default db
