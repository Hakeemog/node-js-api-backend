// index.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple in-memory "database"
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js API Backend!');
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ message: 'Name and email are required' });
  }
});

// Update an existing user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
