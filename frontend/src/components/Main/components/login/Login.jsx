import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../blocks/login.css";

export default function Login({ onLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data);
  };

  return (
    <>
      <div className="login">
        <h2 className="title__login"> Inicia sesion</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <fieldset className="login__form-fieldset">
            <input
              className="login__form-input"
              name="email"
              placeholder="E-mail"
              type="email"
              value={data.email}
              id="email"
              required
              onChange={handleChanges}
            ></input>
            <span></span>
            <input
              className="login__form-input"
              name="password"
              placeholder="Password"
              type="password"
              value={data.password}
              id="password"
              required
              onChange={handleChanges}
            ></input>
            <span></span>
            <button className="login__button" type="submit">
              Inicia sesion
            </button>
          </fieldset>
        </form>
        <Link className="login__register-link" to="/register">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </div>
    </>
  );
}
