const express = require("express");
const path = require('path');
const productRouter = require('./routes/productRouter')


const app = express();
// to be able to process json add this line of code 
app.use(express.json()); 

app.use('/products', productRouter);


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