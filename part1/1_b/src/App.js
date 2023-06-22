

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
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App;

const Header = (props) => {
  return (
    <p>{props.course.name}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part, index) => {
        return <p>{part.name} {part.exercises}</p>
      })}
    </div>
  )
}

const Total = (props) => {
  let count = 0;
  {props.course.parts.map((part, index) => {
    count += part.exercises;
  })}
  return count;
}