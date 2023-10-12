import { useState, useEffect } from 'react'
import axios from 'axios'


const Search = ({ handleSearch, search }) => {
  return (
    <div>
      <span>find countries</span>
      <input value={search} onChange={handleSearch}/>
    </div>
  )
}

const ListItem = ({country, buttonAction}) => {
  return (
    <>
    <div>
      <div>{country}</div> 
    </div>
    </>
  )
}

const LanguageListItem = ({ language }) => <li>{language}</li>
const Country = ({ country }) => {

  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const image_url = country.flags.png
  const languages = Object.values(country.languages)

  return (
  <>
    <h1>{name}</h1>
    <div>Capital: {capital}</div>
    <div>Area: {area}</div>
    <h3>languages:</h3>
    <ul>
      {
        languages.map(lang => {
          return <LanguageListItem language={lang} key={lang}/>
        })
      }

    </ul>
    <img src={image_url} />
  </>
  )
}

const ShowCountries = ({ countries, buttonAction }) => {
  if (countries.length > 10) return <div>Too many countries</div>
  if (countries.length < 1) return <div>Doesnt match any criteria</div>
  if (countries.length == 1) return <Country country={countries[0]}/>

  return (
  <>
  {countries.map(country => <ListItem key={country.name.common} country={country.name.common} buttonAction={buttonAction}/>)}
  </>
  )
}


function App() {
  const [search, setSearch] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const filter = (filter) => {
    if (countries.length == 0) return []
    const listOfCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    setCountriesToShow(listOfCountries)
  }


  const handleSearch = (event) => {
    setSearch(event.target.value)
    filter(event.target.value)
  }


  return (
    <>
    <Search value={search} handleSearch={handleSearch}/>
    <ShowCountries countries={countriesToShow} buttonAction={setCountriesToShow}/>
    </>
  )
}

export default App
