const express = require("express");
const path = require('path');
const cors = require('cors');
const productRouter = require('./routes/productRouter')


const app = express();
// to be able to process json add this line of code 
app.use(express.json()); 
app.use(cors());
app.use('/products', productRouter);
let db = [
  {id: 1, username: 'John', password: '111'},
  {id: 2, username: 'Edward', password: '222'}
];

app.post('/login', (req, res, next)=> {
  const user = db.find(user => user.username === req.body.username && user.password === req.body.password);
  if(user){
      res.json({accessToken: `${user.id}-${user.username}-${Date.now().toString()}`})
  } else {
      res.json({error: 'Invalid username and password!'});
      // throw new Error('dfdfdf');
  }
});

app.use(express.static(path.join(__dirname,'public')));

app.use((err, req, res, next) => {
    console.log(err);
    console.log(err);
    if (err.message === 'NOT Found') {
      res.status(404).json({error: err.message});
    } else if (err.message === 'Authentication Failure') {
      res.status(401).json({"msg": "You have no power here!", "authentication": "failure"});
    } else {
      res.status(500).json({error: 'Something is wrong! Try later'});
    }
  });
app.listen(3000, () => console.log('listening to 3000...'));