const express = require("express");
const { PORT = 3000 } = process.env;

const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "/")));
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");
const {
  login,
  createUser,
  updateProfile,
  updateAvatar,
} = require("./controllers/users");
const auth = require("./middleware/auth");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const validator = require("validator");
require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.options("*", cors());
const allowedCors = ["localhost:3000"];
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`app listening at por ${PORT}...`);
});

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server is going to fall down");
  }, 0);
});
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

app.post(
  "/sigin",
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

app.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(100).required(),
    }),
  }),
  updateProfile
);

app.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);
//autorizacion
app.use(auth);
//Estas rutas necesitan auth
app.use("/", usersRoute);
app.use("/", cardsRoute);

app.use(errorLogger);
app.use(errors());

app.get("/", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado :/ " });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error en el servidor" : message,
  });
});
