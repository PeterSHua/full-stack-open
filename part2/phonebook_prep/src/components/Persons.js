import Person from './Person';

let Persons = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map(({ name, number }) => {
          return <Person key={name} name={name} number={number} />;
        })}
      </ul>
    </div>
  );
};

export default Persons;
