import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const Weather = (props) => {
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    axios
      .get('http://api.weatherapi.com/v1/current.json',
      {
      params : {
        key: process.env.REACT_APP_API_KEY,
        q: props.capital
      }
      }) 
      .then(response => {
        const data = response.data
        setWeather(data.current);
  })
},[props.capital])

  if (weather.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
    <h3>Weather in {props.capital}</h3>
    <b>temperature: </b>{weather.temp_c} Celsius<br></br>
    <img style={{height:60,width:75}} alt="weather" src={weather.condition.icon}></img><br></br>
    <b>wind: </b> {weather.wind_mph} mph direction {weather.wind_dir}
    </div>
  )
}

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
            Spoken languages
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
          <img style={{height:80,width:110}} alt="flag" src={filtered[0].flag}></img>
          <div>
            <Weather capital ={filtered[0].capital}></Weather>
          </div>
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