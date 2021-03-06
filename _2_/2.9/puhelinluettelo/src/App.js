import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

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
      setPersons(persons.concat(nameAndNumberObject))
      setNewName('')
      setNewNumber('')
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
        <div>
          filter shown with
          <input value={newFilter}
          onChange={handleFilterChange}/>
        </div>
      <h2>add a new</h2>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>      
        {filtered.map(person => 
          <div key={person.name}>
          {person.name} {person.number}
          </div>
        )}
      </div>
      
        
    </div>
  )

}

export default App