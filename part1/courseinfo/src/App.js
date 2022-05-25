const Header = (obj) => <h1>{obj.course}</h1>
const Part = (obj) => <p>{obj.part} {obj.exercises}</p>
const Total = (obj) => <p>Number of exercises {obj.total}</p>
const Content = (obj) => {
  return (
    <div>
      <Part part={obj.part1} exercises={obj.exercises1} />
      <Part part={obj.part2} exercises={obj.exercises2} />
      <Part part={obj.part3} exercises={obj.exercises3} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App;
