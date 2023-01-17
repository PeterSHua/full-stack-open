import { useState, useEffect } from 'react';

import AddContact from './components/AddContact';
import ContactFilter from './components/ContactFilter';
import ContactList from './components/ContactList';
import Notification from './components/Notification';

import contactService from './services/contacts';

const App = () => {
  const FLASH_DURATION = 3000;

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsFilter, setPersonsFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [flash, setFlash] = useState({
    message: null,
    type: null,
    duration: FLASH_DURATION,
  });

  const personsToDisplay = (filter, filtered, unfiltered) => {
    if (filter.length > 0) {
      return filtered;
    } else {
      return unfiltered;
    }
  }

  const hook = () => {
    const allContacts = async () => {
      try {
        let data = await contactService.getAll();
        setPersons(data);
      } catch {
        console.log("Couldn't fetch all contacts");
      }
    }

    allContacts();
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={flash.message}
        type={flash.type}>
      </Notification>
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
        setNewNumber={setNewNumber}
        setFlash={setFlash}
        flashDuration={FLASH_DURATION}>
      </AddContact>
      <h2>Numbers</h2>
      <ContactList
        persons={personsToDisplay(personsFilter, filteredPersons, persons)}
        setPersons={setPersons}>
      </ContactList>
    </div>
  )
}

export default App
