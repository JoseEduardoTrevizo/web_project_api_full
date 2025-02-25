const express = require("express");
const { PORT = 3000 } = process.env;

const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "/")));
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");
const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middleware/logger");
const auth = require("./middleware/auth");

const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

require("dotenv").config();

const cors = require("cors");

const allowedCors = ["http://localhost:5173", "https://a"];

app.use(cors({ origin: allowedCors }));

app.use(express.json());

//Conexion a la base de datos
mongoose
  .connect("mongodb://localhost:27017/eduardodb")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server is going to fall down");
  }, 0);
});

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().optional(),
      about: Joi.string().optional(),
      avatar: Joi.string().optional(),
    }),
  }),
  createUser
);

//autorizacion
app.use(auth);
//Estas rutas necesitan auth
app.use("/", usersRoute);
app.use("/", cardsRoute);

app.use(errorLogger);
app.use(errors());

app.use("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado :/ " });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    err,
    message: statusCode === 500 ? "Error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`app listening at por ${PORT}...`);
});
