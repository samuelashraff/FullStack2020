import {useState, useEffect} from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryData from './components/CountryData'


const App = () => {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setData(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    setFilteredCountries(data.filter((country) => {
      return country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    }))
  }
  

  return (
    <div>
      <div>
        Find countries <input value={searchQuery} onChange={handleSearch} />
      </div>
      {filteredCountries.length === 1 && (
        <CountryData country={filteredCountries[0]} />
      )}
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <CountryList
        filteredCountries={filteredCountries}
          setFilteredCountries={setFilteredCountries}
        />
      )}
    </div>
  );
}

export default App;
