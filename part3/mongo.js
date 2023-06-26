const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('Usage: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://nicholaswatney:${password}@cluster0.q7omy7x.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  phone: String
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: name,
  phone: number
});

note.save().then(() => {
  console.log('Note saved!');
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
});
