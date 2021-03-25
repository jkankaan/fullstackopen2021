import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

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
    <h1>{course.name}</h1>
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

export default App