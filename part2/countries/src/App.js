import { useEffect, useState } from 'react'
import axios from 'axios'

import CountryDisplay from './components/CountryDisplay'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})
  const [weather, setWeather] = useState({})
  const [searchParams, setSearchParams] = useState('')

  // Currently, this is called twice in every render when updating searchParams
  const filterCountries = (params) => countries.filter(country =>
    country.name.common.toUpperCase().includes(params.toUpperCase()))

  const updateCountryList = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }

  const updateWeatherByLocation = (loc) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${loc[0]}&lon=${loc[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(response => setWeather(response.data))
  }

  const updateSearch = (event) => {
    const filteredCountries = filterCountries(event.target.value)
    if (filteredCountries.length === 1)
      updateCountry(filteredCountries[0])
    else {
      setCountry({})
      setWeather({})
    }

    setSearchParams(event.target.value)
  }

  // To reduce weather API calls, the weather data could be appended within the list of countries
  const updateCountry = (country) => {
    updateWeatherByLocation(country.capitalInfo.latlng)
    setCountry(country)
  }

  useEffect(updateCountryList, [])

  return (
    <div>
      find countries <input value={searchParams} onChange={updateSearch} />
      <CountryDisplay 
        countryList={filterCountries(searchParams)} 
        country={country} 
        weather={weather} 
        selectCountry={updateCountry}
      />
    </div>
  )
}

export default App
