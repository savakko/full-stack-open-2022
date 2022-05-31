import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryList = ({ countries, searchParams }) => {
  const list = countries.filter(country =>
    country.name.common.toUpperCase().includes(searchParams.toUpperCase()))

  if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (list.length === 1) {
    return <Country country={list[0]} />
  }

  return (
    <div>
      {list.map(country => 
        <div key={country.name.official}>{country.name.official}</div>)}
    </div>
  )
}
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
  </div>


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchParams, setSearchParams] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      find countries <input value={searchParams} onChange={(event) => setSearchParams(event.target.value)} />
      <CountryList countries={countries} searchParams={searchParams} />
    </div>
  )
}

export default App
