import Header from './Header';
import Part from './Part';
import Total from './Total';

const Course = ({ course }) => {
  let { name, parts } = course;
  
  return (
    <div>
      <Header course={name} />

      {parts.map(({ name, exercises, id }) => {
        return <Part key={id} part={name} count={exercises} />
      })}
      <Total parts={parts} />
    </div>
  );
};

export default Course;

