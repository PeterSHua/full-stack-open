import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryDetails from "./CountryDetails";

const SCHEME_HOST_PATH = 'https://api.openweathermap.org/data/2.5/weather';
const ICON_SCHEME_HOST_PATH_PREFIX = 'http://openweathermap.org/img/wn/';
const ICON_PATH_SUFFIX = '@2x.png';
const KELVIN_TO_CELCIUS = 273.15;

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const ActiveCountry = ({ country }) => {
    let name, capital, area, languages, flags;
    const [weather, setWeather] = useState({});

    if (country !== undefined) {
      ({ name, capital, area, languages, flags } = country);
    }

    const hook = () => {
      if (capital === undefined) {
        return;
      }

      axios
        .get(`${SCHEME_HOST_PATH}?q=${capital}&appid=${API_KEY}`)
        .then((response) => {
          let iconURL = ICON_SCHEME_HOST_PATH_PREFIX +
                          response.data.weather[0].icon +
                          ICON_PATH_SUFFIX;

          let tempCelcius = (response.data.main.temp - KELVIN_TO_CELCIUS)
                             .toFixed(2);

          setWeather({
            iconURL: iconURL,
            windMetric: response.data.wind.speed,
            tempCelcius: tempCelcius,
          });
        })
    }

    useEffect(hook, [capital]);

    if (country === undefined) {
      return;
    }

    return (<CountryDetails
              key={name}
              name={name}
              capital={capital}
              area={area}
              languages={languages}
              flagURL={flags.png}
              tempCelcius={weather.tempCelcius}
              weatherURL={weather.iconURL}
              windMetric={weather.windMetric}>
            </CountryDetails>);
};

export default ActiveCountry;
