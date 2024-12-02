const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;


const users = [
  { email: 'user@example.com', password: 'password123' },
];

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  return res.status(200).json({ success: true, message: 'Login successful!' });
});

app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
