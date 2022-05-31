import { useEffect, useState } from 'react'
import axios from 'axios'

const InputField = ({ desc, value, action }) => 
  <div>{desc}: <input value={value} onChange={action} /></div>

const PersonForm = ({ action, name, number, setName, setNumber }) => 
  <form onSubmit={action}>
    <InputField desc="Name" value={name} action={setName} />
    <InputField desc="Number" value={number} action={setNumber} />
    <button type="submit">add</button>
  </form>

const Persons = ({ persons, filter }) => 
  persons
    .filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    .map(person => <div key={person.name}>{person.name} {person.number}</div>)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterParams, setFilterParams] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName))
      return alert(`${newName} is already added to phonebook`)

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <InputField
        desc={"Filter shown with"}
        value={filterParams}
        action={(event => setFilterParams(event.target.value))}
      />

      <h3>Add a new</h3>
      <PersonForm
        action={addPerson}
        name={newName}
        setName={(event) => setNewName(event.target.value)}
        number={newNumber}
        setNumber={(event) => setNewNumber(event.target.value)}
      />
      
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterParams} />
    </div>
  )
}

export default App