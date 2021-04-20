import React from 'react'

const PersonForm = (props) => {
    return(
    <form onSubmit={props.nameandnumber}>
        <div>
          name: <input value={props.newname}
          onChange={props.handlename}/>
        </div>
        <div>
          number: <input value={props.newnumber}
          onChange={props.handlenumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )}

    export default PersonForm