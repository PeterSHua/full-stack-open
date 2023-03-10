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
      alert(`${newName} is already added to phonebook`);
      return;
    }

    let newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
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
