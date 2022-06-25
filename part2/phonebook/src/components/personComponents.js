const InputField = ({ desc, value, action }) => 
  <div>{desc}: <input value={value} onChange={action} /></div>

const PersonForm = ({ action, name, number, setName, setNumber }) => 
  <form onSubmit={action}>
    <InputField desc="Name" value={name} action={setName} />
    <InputField desc="Number" value={number} action={setNumber} />
    <button type="submit">add</button>
  </form>

const Persons = ({ persons, filter, onDelete }) => 
  persons
    .filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    .map(person => 
      <div key={person.name}>{person.name} {person.number} {''}
        <button type="submit" onClick={(event) => onDelete(event)(person)}>delete</button>
      </div>
    )

export { InputField, PersonForm, Persons }