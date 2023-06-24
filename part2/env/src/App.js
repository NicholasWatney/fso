import { useState, useEffect } from "react";
import server from "./services/server.js";

const Notification = ({notification}) => {
  if (notification == null) {
    return null;
  } else {
    return (
      <div
        style = {{
          font: "14px",
          borderRadius: "1px",
          color: "orange",
          backgroundColor: "black"
        }}
      >
        {notification}
      </div>
    )
  }
}
const App = () => {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState({
    name: "", number: ""
  });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const shownData = filter === "" ? data : 
    data.filter((element) => {
    return element.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    server.getAll().then(initialData => {
      setData(initialData);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with 
        <input onChange={(event) => setFilter(event.target.value)}/>
      </div>
      <h1>add a new</h1>
      <Notification notification={notification}/>
      <div>
        name:
        <input 
          value={add.name}
          onChange={(event) => setAdd({...add, name: event.target.value})}/>
      </div>
      <div>
        number:
        <input 
          value={add.number}
          onChange={(event) => setAdd({...add, number: event.target.value})}/>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          server 
            .create(add)
            .then(response => {
              setData(data.concat(response));
              setNotification(`Added ${response.name}`)
            })
          setAdd({name: "", number: ""})
          setTimeout(() => {
            setNotification(null);
          }, 2000)
        }}>
        <button type='submit'>add</button> 
      </form>
      <h1>Numbers</h1>
      <div>
        {shownData.map((element) => (
          <div key={element.id}>
            {element.name} {element.number} 
            <button
              onClick = {(event) => {
                event.preventDefault();
                if (window.confirm(`delete "${element.name}"?`)) {
                  server
                    .remove(element.id)
                    .then(response => {
                      setData(data.filter(item => item.id !== element.id));
                    });
                }
              }}>delete</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default App;
