import Part from './Part';

const Total = ({ content }) => {
  let total = content.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return (
    <p><b>total of {total} exercises</b></p>
  );
}

const Content = ({ content }) => {
  return (
    <div>
      {content.map(({ id, name, exercises }) => {
        return <Part key={id} part={name} exercises={exercises}></Part>;
      })}
      <Total content={content}></Total>
    </div>
  );
}

export default Content;
