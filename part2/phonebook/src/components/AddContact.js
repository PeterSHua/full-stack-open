import contactService from '../services/contacts';

const AddContact = (props) => {
  let { persons, setPersons } = props;
  let { newName, newNumber, setNewName, setNewNumber } = props;

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const createContact = async (newContact) => {
    try {
      let data = await contactService.create(newContact);
      setPersons(persons.concat(data));
    } catch {

    }
  };

  const isNewNameUnique = () => {
    return persons.every((person) => person.name !== newName);
  };

  const asyncUpdateContact = async (contact) => {
    try {
      let id = contactService.findPersonId(newName, persons);
      await contactService.update(id, contact);

      let idx = contactService.findPersonIdx(id, persons);
      let newPersons = [...persons];

      newPersons[idx].number = newNumber;
      setPersons(newPersons);
    } catch {
      console.log("Couldn't update contact");
    }
};

  const handleSubmit = (event) => {
    event.preventDefault();

    let newContact = {
      name: newName,
      number: newNumber,
    };

    if (isNewNameUnique()) {
      createContact(newContact);
    } else {
      let msg = `${newName} is already added to phonebook, replace the old
number with a new one?`

      if (window.confirm(msg)) {
        asyncUpdateContact(newContact);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default AddContact;
