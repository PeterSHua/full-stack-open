import Language from './Language';

const CountryDetails = (props) => {
  let { name, capital, area, languages, flagURL } = props;
  let { tempCelcius, weatherURL, windMetric } = props;

  return (
    <div>
      <h1>{name}</h1>
      <p>
        capital {capital}<br></br>
        area {area}
      </p>

      <b>languages:</b>
      <ul>
        {languages.map((language) => {
          return (<Language
                    key={language.name}
                    name={language.name}>
                  </Language>);
        })}
      </ul>
      <img src={flagURL} alt="flag"></img>
      <h2>Weather in {capital}</h2>
      <div>temperature {tempCelcius} Celcius</div>
      <img src={weatherURL} alt="weather"></img>
      <div>wind {windMetric}</div>
    </div>
  );
}

export default CountryDetails;

