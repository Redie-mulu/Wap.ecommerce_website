const express = require("express");
const path = require('path');
const cors = require('cors');
const productRouter = require('./routes/productRouter')
const users = require("./data/user").users;

const data = require('./data/user');
const app = express();
// to be able to process json add this line of code 
app.use(express.json());
app.use(cors());
app.use('/products', productRouter);

app.post('/login', (req, res, next) => {
  const user = users.find(user => user.username === req.body.username && user.password === req.body.password);
  if (user) {
    let token = `${user.id}-${user.username}-${Date.now().toString()}`;
    user.accessToken = token;
    res.json({ accessToken: token });
  } else {
    res.json({ error: 'Invalid username and password!' });

  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.log(err);
  console.log(err);
  if (err.message === 'NOT Found') {
    res.status(404).json({ error: err.message });
  } else if (err.message === 'Authentication Failure') {
    res.status(401).json({ "msg": "You have no power here!", "authentication": "failure" });
  } else {
    res.status(500).json({ error: 'Something is wrong! Try later' });
  }
});
app.listen(3000, () => console.log('listening to 3000...'));