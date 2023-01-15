const Country = ({ name, handleClick}) => {
  return (
    <div key={name}>
      <span>{name}</span>
      <span>
        <button data-name={name} onClick={handleClick}>show</button>
      </span>
    </div>
  );
};

export default Country;
