import personService from '../services/persons';

let PersonForm = (props) => {
  let { newName, newNumber, persons } = props;
  let { setNewName, setNewNumber, setPersons } = props;

  let handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  let handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  let addPerson = (event) => {
    event.preventDefault();

    let uniquePerson = () => {
      return persons.every(({ name }) => {
        console.log(`currName: ${name} newName: ${newName}`);
        return newName !== name;
      });
    }

    if (!uniquePerson()) {
      let msg = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(msg)) {
        let id = personService.findPersonId(newName, persons);

        personService
          .update(id, { name: newName, number: newNumber })
          .then((result) => {
            let idx = personService.findPersonIdx(id, persons);
            let copy = [...persons];

            copy[idx].number = newNumber;
            setPersons(copy);
          })
          .catch((error) => {
            console.log("couldn't update");
          });
      }

      return;
    }

    let newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
