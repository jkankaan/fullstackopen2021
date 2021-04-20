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

  const [ message, setMessage] = useState({msg:null,type:null})

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
            setMessage({msg:`Phone number replaced`, note:'notification'})
            setTimeout(() => {
              setMessage({msg:null,type:null})
            },2000)})
          .catch(error => {
            setMessage({msg:`Information of ${newName} has already been removed from server`, type:'error'})
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => {
              setMessage({msg:null, type:null})
            },2000)
          })
            
      }}
  
    
    else {
      personService
        .create(nameAndNumberObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage({msg:`Added ${newName}`, type:'notification'})
          setTimeout(() => {
            setMessage({msg:null, type:null})
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
            setMessage({msg:`Deleted ${name}`, type:'notification'})
            setTimeout(() => {
              setMessage({msg:null, type:null})
            },2000)
          
      }
    }

    const Notification = (props) => {
      const notificationStyle = 
      {
        fontStyle: 'arial',
        fontSize: 25,
        borderRadius: '5px',
        backgroundColor: 'lightgrey',
        height: '50px',
        fontWeight: 'bold',
        lineHeight: '50px',   
        padding: '10px'
      }

      props.message['type']==='error' ? notificationStyle.color = 'red' : notificationStyle.color = 'green'
      props.message['type']==='error' ? notificationStyle.border = '3px solid red' : notificationStyle.border = '3px solid green'

      if (props.message['msg'] === null) {
        return null
      }
      return (
        <div style={notificationStyle}>
          {props.message['msg']}
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