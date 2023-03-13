import personService from '../services/persons';

let Person = ({ id, name, number, persons, setPersons }) => {
  let deleteHandler = (event) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((result) => {
          let idx = personService.findPersonIdx(id, persons);
          let copy = [...persons];

          copy.splice(idx, 1);
          setPersons(copy);
        })
    };
  };

  return (
    <>
      <li id={id}>{name} {number}
        <button onClick={deleteHandler}>delete</button>
      </li>
    </>
  );};

export default Person;
