import { useEffect, useState } from 'react'

import { InputField, PersonForm, Persons } from './components/personComponents'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterParams, setFilterParams] = useState('')

  const getPersons = () => {
    personService.getPersons().then(response => setPersons(response))
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        updatePerson({ ...person, number: newNumber })
      }
      return
    }

    personService.postPerson({ name: newName, number: newNumber })
      .then(response => setPersons(persons.concat(response)))

    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (person) => {
    personService.updatePerson(person)
      .then(() => getPersons())  // Fetch the resources again because I'm lazy

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    event.preventDefault()

    return (person) => {
      if (window.confirm('Are you sure?')) {
        personService.deletePerson(person)
          .then(setPersons(persons.filter(p => p.id !== person.id)))
      }
    }
  }

  useEffect(getPersons, [])

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
      <Persons persons={persons} filter={filterParams} onDelete={deletePerson} />
    </div>
  )
}

export default App