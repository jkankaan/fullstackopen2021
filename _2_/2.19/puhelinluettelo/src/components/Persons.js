import React from 'react'

const Persons = (props) => {
    return(
        <div>      
        {props.persons.map(person => 
          <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.delete_function(person.id, person.name)}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons