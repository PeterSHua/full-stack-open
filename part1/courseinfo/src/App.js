import Course from './components/Course';
import Header from './components/Header';
import Content from './components/Content';

const Total = ({ exercises }) => {
  return (
    <p>
      Number of exercises {exercises.reduce((prev, curr) => prev + curr)}
    </p>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
