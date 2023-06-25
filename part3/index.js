const express = require('express');
const app = express();
const morgan = require('morgan');
const requestLogger = morgan('combined');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(requestLogger);


let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
  ];

app.get("/api/persons", (request, response) => {
  response.json(notes);
})

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const entryCount = notes.length;
  const infoMessage = `Phonebook has info for ${entryCount} people.<br><br>Current time: ${currentTime}`;

  response.send(infoMessage);
});

app.get("/", (request, response) => {
  response.send("Welcome to the Phonebook API");
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = notes.find((note) => note.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

function generateRandomId() {
  return Math.floor(Math.random() * 100000);
}

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const existingPerson = notes.find((note) => note.name === body.name);
  if (existingPerson) {
    return response.status(400).json({ error: "Name already exists in the phonebook" });
  }

  const newPerson = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  };

  notes.push(newPerson);

  response.json(newPerson);
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`LISTENING: ${PORT}`);
})