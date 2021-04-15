import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameAndNumberObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService
        .create(nameAndNumberObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
    }) 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filtered = persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter = {newFilter} handle = {handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm nameandnumber = {addNameAndNumber} newname = {newName}
        handlename = {handleNameChange} newnumber = {newNumber}
        handlenumber = {handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons = {filtered}/>     
    </div>
  )

}

export default App