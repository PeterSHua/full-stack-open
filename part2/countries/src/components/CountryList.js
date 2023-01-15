import Country from "./Country";
const FILTER_RESULT_LIMIT = 10;

const CountryList = ({ countries, setActiveCountry }) => {
  const handleClick = (event) => {
    let activeCountryName = event.target.dataset.name;

    let activeCountry = countries.filter((country) => {
      return country.name === activeCountryName;
    })[0];

    setActiveCountry(activeCountry);
  };

  if (countries.length > FILTER_RESULT_LIMIT) {
    return 'Too many matches, specify another filter';
  }

  let list = countries.map((country) => {
    return (<Country
              key={country.name}
              name={country.name}
              handleClick={handleClick}>
            </Country>);
  });

  return list;
}

export default CountryList;
