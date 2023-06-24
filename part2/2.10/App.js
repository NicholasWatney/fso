import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const onFilterChange = (event) => {
    setFilterName(event.target.value);

    const filteredResults = persons.filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilteredPersons(filteredResults);
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onSubmitClick = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      window.alert(`${newName} is already added to the phonebook`);
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      };

      setPersons(persons.concat(newObject));
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with{' '}
        <input value={filterName} onChange={onFilterChange} />
      </form>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button onClick={onSubmitClick} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
