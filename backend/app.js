const express = require("express");
const { PORT = 3000 } = process.env;

const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "/")));
const bodyParser = require("body-parser");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
require("dotenv").config();
app.use(bodyParser.json());

app.use(express.json());

//Conexion a la base de datos
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });

app.listen(PORT, () => {
  console.log(`app listening at por ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: "6764dd4058098834d3a4668e",
  };

  next();
});

app.post("/sigin", login);
app.post("/signup", createUser);
app.use(auth);
app.use("/", usersRoute);
app.use("/", cardsRoute);

app.get("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado :/ " });
});
