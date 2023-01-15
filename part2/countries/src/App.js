import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryFilter from './components/CountryFilter';
import CountryList from './components/CountryList';
import ActiveCountry from './components/ActiveCountry';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState(undefined);

  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => {
        setCountries(response.data);
      })
  };

  useEffect(hook, []);

  return (
    <div>
      <CountryFilter
        countries={countries}
        setFilteredCountries={setFilteredCountries}
        setActiveCountry={setActiveCountry}>
      </CountryFilter>
      <CountryList
        countries={filteredCountries}
        setActiveCountry={setActiveCountry}></CountryList>
      <ActiveCountry country={activeCountry}></ActiveCountry>
    </div>
  );
};

export default App
