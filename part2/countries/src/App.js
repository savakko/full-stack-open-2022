import { useEffect, useState } from 'react'
import axios from 'axios'

import CountryDisplay from './components/CountryDisplay'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})
  const [searchParams, setSearchParams] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const updateSearch = (event) => {
    if (Object.keys(country).length !== 0) {
      setCountry({})
    }
    setSearchParams(event.target.value)
  }

  return (
    <div>
      find countries <input value={searchParams} onChange={updateSearch} />
      <CountryDisplay countryList={countries} currentCountry={country} show={setCountry} searchParams={searchParams} />
    </div>
  )
}

export default App
