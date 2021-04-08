import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])

  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        const data = response.data
        setCountries(data);
      
      })
  },[])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  if (countries.length === 0) {
    return <div>Loading...</div>
    }

  const filtered = countries.filter((country) => {
    return country.name.toLowerCase().includes(newFilter.toLowerCase())
    })

  const Display = () => {
    if (filtered.length === 1) {
      return (
        <div>
          <h2>
            {filtered[0].name}
          </h2>
          <div>
            capital {filtered[0].capital}
          </div>
          <div>
            population {filtered[0].population}
          </div>
          <h3>
            languages
          </h3>
          {filtered[0].languages.map(language => 
          <div key = {language.name}>
            <ul>
              <li style={{height: 5}}>
                {language.name}
              </li>
            </ul>
          </div>
          )}
          <img style={{height:120,width:150}} alt="flag" src={filtered[0].flag}></img>
        </div>
      )
    }
    else if ((filtered.length > 10) && (filtered.lenght !== 1)) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
    )}
    else { 
      return (
        <div>
          {filtered.map(country => 
          <div key = {country.name}>
           {country.name}
           <button onClick={() =>setNewFilter(country.name)}>show</button>
          </div>
          )}
        </div>
      )
    }
  }

  return (
    <div>
        <Filter filter = {newFilter} handle = {handleFilterChange}/>
        <Display ></Display>
    </div>
  )

}

export default App