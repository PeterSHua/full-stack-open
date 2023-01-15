const CountryFilter = (props) => {
  let { countries, setFilteredCountries } = props;
  let { setActiveCountry } = props;

  const filterCountries = (filter) => {
    if (filter.length === 0) {
      return [];
    }

    let filteredCountries = countries.filter(({ name }) => {
      let regex = new RegExp(filter, 'i');
      return regex.test(name);
    });

    if (filteredCountries.length === 1) {
      setActiveCountry(filteredCountries[0]);
    } else {
      setActiveCountry(undefined);
    }

    return filteredCountries;
  }

  const handleChange = (event) => {
    let filter = event.target.value;
    setFilteredCountries(filterCountries(filter));
  }

  return (
    <>
      find countries <input onChange={handleChange}></input>
    </>
  );
}

export default CountryFilter;
