const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());



const uri = "mongodb+srv://siraj:Tp69NNRIh2EkY6ZG@cluster0.xxdhvm1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(client,"test");


app.use(express.static(path.join(__dirname, 'src')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      await client.connect();
      const database = client.db("TodoList_DB");
      const collection = database.collection("Users");

      // Store user data in MongoDB
      const result = await collection.insertOne({ username, password });
      console.log('User registered:', { username, password });

      // Send a JSON response with success message and redirect URL
      res.status(201).json({ message: 'User registered successfully', redirectUrl: '/index.html' });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      await client.connect();
      const database = client.db("TodoList_DB");
      const collection = database.collection("Users");

      const result = await collection.findOne({ username, password });
      console.log('User logged:', { username, password });
      if (!result) {
        // User not found in the database
        return res.status(404).json({ error: 'User not found. Please register.' });
      }


      res.status(201).json({ message: 'User logged successfully', redirectUrl: '/todo.html' });
    } 
    finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  









app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


