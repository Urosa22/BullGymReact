import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { user, role, logout } = useContext(AuthContext);

  return user ? (
    <ul className="Auth">
      Has iniciado sesion como
      <Link className="Link" to={`/users/${user.id}`}>
        {user.username}
      </Link>{" "}
      {role === "admin" ? (
        <Link className="Link" to={"/exercises"}>
          <button className="crearEjercicio"></button>
        </Link>
      ) : null}
      <Link to={"/users/login"}>
        <button onClick={() => logout()} className="Out">
          {" "}
        </button>
      </Link>
    </ul>
  ) : (
    <article className="BotonesPrincipales">
      <Link to={"/users"}>
        {" "}
        <button className="Registrate"></button>
      </Link>

      <Link to={"/users/login"}>
        <button className="iniciarSesion"></button>
      </Link>
    </article>
  );
};
