import { useState, useEffect } from 'react';

import AddContact from './components/AddContact';
import ContactFilter from './components/ContactFilter';
import ContactList from './components/ContactList';

import contactService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsFilter, setPersonsFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  const personsToDisplay = (filter, filtered, unfiltered) => {
    if (filter.length > 0) {
      return filtered;
    } else {
      return unfiltered;
    }
  }

  const hook = () => {
    const allContacts = async () => {
      let data = await contactService.getAll();
      setPersons(data);
    }

    allContacts();
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactFilter
        persons={persons}
        setPersonsFilter={setPersonsFilter}
        setFilteredPersons={setFilteredPersons}>
      </ContactFilter>
      <h2>add a new</h2>
      <AddContact
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}>
      </AddContact>
      <h2>Numbers</h2>
      <ContactList
        persons={personsToDisplay(personsFilter, filteredPersons, persons)}>
        setPersons={setPersons}
      </ContactList>
    </div>
  )
}

export default App
