// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('User not found');
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(401).send('Invalid password');
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send('Failed to login');
  }
});
