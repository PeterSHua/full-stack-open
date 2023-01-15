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
    let data = await contactService.create(newContact);

    setPersons(persons.concat(data));
  };

  const isNewNameUnique = () => {
    return persons.every((person) => person.name !== newName);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNewNameUnique()) {
      let newContact = {
        name: newName,
        number: newNumber,
      };

      createContact(newContact);
    } else {
      alert(`${newName} is already added to phonebook`);
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
