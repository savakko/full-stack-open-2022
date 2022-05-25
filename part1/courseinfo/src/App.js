const Header = (wrapper) => <h1>{wrapper.course.name}</h1>
const Part = (wrapper) => <p>{wrapper.part.name} {wrapper.part.exercises}</p>
const Total = (wrapper) => {
  return (
    <p>
      Number of exercises {
        wrapper.parts.map(e => e.exercises).reduce((sum, b) => sum + b)
      }
    </p>
  )
}
const Content = (wrapper) => {
  return (
    <div>
      <Part part={wrapper.parts[0]} />
      <Part part={wrapper.parts[1]} />
      <Part part={wrapper.parts[2]} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
