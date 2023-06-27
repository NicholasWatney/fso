const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require("./utils/logger");
const config = require('./utils/config');
const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Blog = mongoose.model('Blog', blogSchema);

const username = process.env.username;
const password = process.env.password;

const mongoUrl = 
    `mongodb+srv://${username}:${password}@cluster0.q7omy7x.mongodb.net/BlogApp?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:\n\n", error);
    })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})