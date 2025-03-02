import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../blocks/login.css";

export default function Register({ onRegister }) {
  const [data, setData] = useState({
    userEmail: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onRegister(data);
  };

  return (
    <>
      <div className="login">
        <h2 className="title__login"> Registrate</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <fieldset className="login__form-fieldset">
            <input
              className="login__form-input"
              name="userEmail"
              placeholder="E-mail"
              type="email"
              value={data.userEmail}
              id="email"
              required
              onChange={handleChanges}
            />
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
            />
            <span></span>
            <button className="login__button" type="submit">
              Registrate
            </button>
          </fieldset>
        </form>
        <Link className="login__register-link" to="/login">
          ¿Ya eres miembro? Inicia sesion aqui
        </Link>
      </div>
    </>
  );
}
