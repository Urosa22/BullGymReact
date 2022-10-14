import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const { token } = await logInUserService({ email, password });
      /* console.log(token); */

      login(token);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="login">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button>Iniciar sesión</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
