const express = require("express");
const mongoose = require("mongoose");
const routes = require("routes.js");

const app = express();

mongoose.connect(
  "mongodb+srv://omni:omni@cluster0-1he40.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(routes);
app.use(express.json());
app.listen(3333);
