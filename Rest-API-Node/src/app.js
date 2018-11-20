const body_parser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const mongo = require("mongoose");
const app = express();
const userRoutes = require('./routes/users');
//settings
//Configuramos la base de datos a usar
mongo.Promise=global.Promise;
mongo
  .connect(
    "mongodb://localhost/rest-api",
    {
      useNewUrlParser: true
    }
  )
  .then(db => console.log("db is conected"))
  .catch(err => console.log(err));
//establecemos el puerto a usar
app.set("port", process.env.PORT || 3000);

//middlware
app.use(morgan("dev"));
app.use(body_parser.json());

//Routes
app.use('/superv',userRoutes);
//start the server
app.listen(app.get("port"), () => {
  console.log("NodeJs-Server on Port", app.get("port"));
});
