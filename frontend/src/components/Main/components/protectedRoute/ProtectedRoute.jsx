import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Si el usuario no ha iniciado sesión, devuelve un componente Navigate que envía al usuario a /login
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
