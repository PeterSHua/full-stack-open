import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-5323523',
    }
  ]);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => setPersons(persons));
  }, []);

  let personsToShow;
  if (filter.length === 0) {
    personsToShow = persons;
  } else {
    personsToShow = persons.filter(({ name }) => {
      let regex = new RegExp(filter, 'i');

      return regex.test(name);
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />

      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        setPersons={setPersons}/>
    </div>
  )
}

export default App
