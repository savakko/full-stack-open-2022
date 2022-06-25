const CountryDisplay = ({ countryList, country, weather, selectCountry }) => {
  // Render a country if one is selected
  if (Object.keys(country).length > 0) {
    return <div>
      <Country country={country} />
      <WeatherInfo weatherData={weather} />
    </div>
  }

  // Refuse to render when there are too many matches
  if (countryList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  // In all other cases, render a list of countries
  return <CountryList countryList={countryList} action={selectCountry} />
}

const CountryList = ({ countryList, action }) => 
  <div>
    {countryList.map(country => 
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => action(country)}>show</button>
      </div>
    )}
  </div>

const Country = ({ country }) => 
  <div>
    <h1>{country.name.common}</h1>
    <div>
      capital {country.capital}<br />
      area {country.area}
    </div>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages)
        .map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt="No flag available"></img>
    <h2>Weather in {country.capital}</h2>
  </div>

const WeatherInfo = ({ weatherData }) => {
  if (Object.keys(weatherData).length === 0) {
    return <div>Awaiting weather info...</div>
  }

  return (
    <div>
      <div>temperature {weatherData.main.temp} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
      <div>wind {weatherData.wind.speed} m/s</div>
    </div>
  )
}

export default CountryDisplay