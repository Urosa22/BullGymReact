import { useState } from "react";
import { registerUserService } from "../services";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line
  const [response, setResponse] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUserService({
        name,
        email,
        password: password,
      });
      /* console.log(data); */
      setResponse(data);
      alert(data);
      navigate("/users/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="register">
      <h2>Regístrate</h2>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="text">Nombre de usuario</label>
          <input
            type="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pw1">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button>Regístrate</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
