import HeadertLogo from "../../images/logo.png";
import { Link } from "react-router-dom";
import React from "react";
import "../../blocks/login.css";

export default function Header({ handleLogOut, email }) {
  React.useEffect(() => {}, [location]);

  return (
    <header className="header">
      <img
        src={HeadertLogo}
        alt="Around of the EE.UU"
        className="header__logo"
      />
      <div className="login__header">
        <h2 className="header__user-email">{email}</h2>

        {location.pathname == "/home" && (
          <Link
            to="/login"
            className="login__header-register"
            onClick={handleLogOut}
          >
            Cerrar sesion
          </Link>
        )}

        {location.pathname == "/login" && (
          <Link
            to="/register"
            className="login__header-register"
            onClick={handleLogOut}
          >
            Registrate
          </Link>
        )}

        {location.pathname == "/register" && (
          <Link
            to="/login"
            className="login__header-register"
            onClick={handleLogOut}
          >
            Iniciar Sesion
          </Link>
        )}
      </div>
    </header>
  );
}
