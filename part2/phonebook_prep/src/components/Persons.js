import Person from './Person';

let Persons = ({ personsToShow, persons, setPersons }) => {
  return (
    <div>
      <ul>
        {personsToShow.map(({ id, name, number }) => {
          return <Person
                   key={name}
                   id={id}
                   name={name}
                   number={number}
                   persons={persons}
                   setPersons={setPersons}
                  />;
        })}
      </ul>
    </div>
  );
};

export default Persons;
