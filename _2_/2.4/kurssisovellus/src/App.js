import React from 'react'

const App = () => {
  const courses = [
  {
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]


  return (
    <div>
      <h2>Web development curriculum</h2>
      {courses.map(course => 
        <div key = {course.id}>
        <Course course={course} />
        </div>
      )}
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

export default App