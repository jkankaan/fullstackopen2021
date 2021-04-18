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

  const [ message, setMessage] = useState('')

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.filter(person => person.name === newName)
        const id = person[0].id  
        personService
          .modify(id, nameAndNumberObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setMessage(`Phone number replaced`)
            setTimeout(() => {
              setMessage(null)
            },2000)
            
      })}}
  
    
    else {
      personService
        .create(nameAndNumberObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          },2000)
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

  const deletePerson = (id, name) => {
    if (window.confirm('Delete ' + name +' ?')){
      personService
        .deleteFunction(id)
        .then(response => response.data)
        personService
          .getAll()
          .then(response => {
            setPersons(persons.filter(person => person.id !== id))
            })
            setMessage(`Deleted ${name}`)
            setTimeout(() => {
              setMessage(null)
            },2000)
          
      }
    }

    const Notification = ({message}) => {
      const notificationStyle = {
        color: 'green',
        fontStyle: 'arial',
        fontSize: 25,
        border: '3px solid green',
        borderRadius: '5px',
        backgroundColor: 'lightgrey',
        height: '50px',
        fontWeight: 'bold',
        lineHeight: '50px',   
        padding: '10px'
      }

      if (message === null) {
        return null
      }
      return (
        <div style={notificationStyle}>
          {message}
        </div>
      )
    }
  
    return (
    <div>
      <h2>Phonebook</h2>
        <Notification message = {message}/>
        <Filter filter = {newFilter} handle = {handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm nameandnumber = {addNameAndNumber} newname = {newName}
        handlename = {handleNameChange} newnumber = {newNumber}
        handlenumber = {handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons = {filtered} delete_function = {deletePerson}/>     
    </div>
  )

}

export default App