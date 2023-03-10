const Total = (({ parts }) => {
  let total = parts.reduce((sum, { exercises }) => {
    return sum + exercises;
  }, 0);

  return <b>Total of {total} exercises</b>;
});

export default Total;
