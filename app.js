require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const userRoutes = require('./routes/userRoute.js');
const articleRoutes = require('./routes/articleRoute.js');
const certiRoutes = require('./routes/certiRoute.js');

const dbString = 'mongodb://localhost:27017/testing' ;


mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
// app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next(error.name);
    }
  } else {
    next();
  }
});

app.use('/', userRoutes);
app.use('/', articleRoutes);
app.use('/', certiRoutes);
//PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})




