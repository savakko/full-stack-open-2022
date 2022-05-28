import React from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((sum, i) => sum + i)

  return (
    <p><b>total of {sum} exercises</b></p>
  )
}
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ parts }) => 
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>

const Course = ({ course }) => 
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course