const ContactFilter = (props) => {
  let { persons, setPersonsFilter, setFilteredPersons } = props;

  const filterPersons = (filter, persons) => {
    return persons.filter((person) => {
      let regex = new RegExp(filter, 'i');
      return regex.test(person.name);
    });
  }

  const handleFilterChange = (event) => {
    setPersonsFilter(event.target.value);
    let filteredPersons = filterPersons(event.target.value, persons);
    setFilteredPersons(filteredPersons);
  }

  return (
    <>
      filter shown with <input onChange={handleFilterChange}></input>
    </>
  );
}

export default ContactFilter;
