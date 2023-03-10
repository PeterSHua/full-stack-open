let Filter = ({ filter, setFilter }) => {
  let handler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      filter shown with <input value={filter} onChange={handler} />
    </>
  );
};

export default Filter;
