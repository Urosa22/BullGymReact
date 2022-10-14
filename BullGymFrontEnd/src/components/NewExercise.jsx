import { useContext, useState } from "react";
import { sendExercicseService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const NewExercise = ({ addExercise }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [sending, setSending] = useState("");
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setSending(true);

      const data = new FormData(e.target);
      console.log(e.target);

      const exercise = await sendExercicseService({ data, token });

      addExercise(exercise);
      alert("Ejercicio añadido correctamente!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };
  return (
    <section className="newExerciseSection">
      <form onSubmit={handleForm} className="formulario">
        <h1>Crear nuevo ejercicio</h1>

        <fieldset>
          <label htmlFor="text">Nombre</label>
          <input type="text" id="name" name="name" required></input>
        </fieldset>

        <fieldset>
          <label htmlFor="type">tipo</label>

          <select id="type" name="type">
            <option value="cardio">Cardio</option>
            <option value="sala de musculación">Sala de Musculación</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="muscle_group">Grupo muscular</label>
          <input
            type="text"
            id="muscle_group"
            name="muscle_group"
            required
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            required
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="image">Imagen (opcional)</label>
          <input type="file" id="image" name="image" accept="image/*"></input>
        </fieldset>
        <button>Añade ejercicio</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
