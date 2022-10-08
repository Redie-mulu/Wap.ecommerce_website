const express = require("express");
const path = require('path');
const cors = require('cors');
const productRouter = require('./routes/productRouter')
const {validateToken} = require("./middlewares/userMiddleware");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");

const data = require('./models/user');
const { Console } = require("console");
const app = express();

// to be able to process json add this line of code 
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/products', validateToken, productRouter);
app.use('/cart', validateToken, cartRouter);

app.use("/resources", express.static(path.join(__dirname, 'public', 'images')));
// what isthis line about?
app.use((err, req, res, next) => {
  const errMessage = err.message;
  if (err.message === 'NOT Found') {
    res.status(404).json({ error: err.message });
  } else if (err.message === 'Authentication Failure') {
    res.status(401).json({ "msg": "You have no power here!", "authentication": "failure" });
  } else {
    res.status(500).json({ error: errMessage });
  }
});
app.listen(3000, () => console.log('listening to 3000...'));