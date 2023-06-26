const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const password = process.argv[2];
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = `mongodb+srv://nicholaswatney:${password}@cluster0.q7omy7x.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema);

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  })
  .catch(error => {
    console.log('Error retrieving notes:', error.message);
    response.status(500).end();
  });
});

app.get("/info", async (request, response) => {
  try {
    const count = await Note.countDocuments({});
    const currentTime = new Date();
    const infoMessage = `Phonebook has info for ${count} people.<br><br>Current time: ${currentTime}`;
    response.send(infoMessage);
  } catch (error) {
    console.log('Error counting documents:', error.message);
    response.status(500).end();
  }
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log('Error retrieving person:', error.message);
      response.status(500).end();
    });
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const newPerson = new Note({
    name: body.name,
    number: body.number,
  });

  newPerson.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => {
      console.log('Error saving person:', error.message);
      response.status(500).end();
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`LISTENING: ${PORT}`);
});
