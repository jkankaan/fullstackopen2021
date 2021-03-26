import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name = {course.name}></Header>
        <Content course = {course}></Content>
      </div>
    )    
  }
  
const Header = (course ) => {
    return (
      <h3>{course.name}</h3>
    )
  }
  
const Part = (props) => {
    return (
      <>
        {props.name} {props.exercises}
      </>  
    )
  }
  
const Content = ({ course }) => {
    let total = 0
    return (
      <div>
        {course.parts.map(course =>
        <p key = {course.id}>
          <Part name={course.name} exercises = {course.exercises} />
        </p>
        )}
        <script>
        {total = course.parts.reduce((s, part) => s + part.exercises,0
        )}
        </script>
        <b>total of {total} exercises</b>
      </div>
    )
  }

export default Course