const CountryDisplay = ({ countryList, currentCountry, show, searchParams }) => {
  // Render the currently selected country if applicable
  if (Object.keys(currentCountry).length !== 0) {
    return <Country country={currentCountry} />
  }

  // Filter the [countryList] based on [searchParams]
  const filteredCountries = countryList.filter(country =>
    country.name.common.toUpperCase().includes(searchParams.toUpperCase()))

  // Update the state if there's a direct match
  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  // Refuse to render an excessively long list
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  // Render the list if there are 0 or 2-10 matches
  return <CountryList countries={filteredCountries} action={show} />
}

const CountryList = ({ countries, action }) => 
  <div>
    {countries.map(country => 
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

export default CountryDisplay