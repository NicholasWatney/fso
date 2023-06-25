import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default App;