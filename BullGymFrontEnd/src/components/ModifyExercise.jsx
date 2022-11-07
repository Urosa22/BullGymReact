import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useExercises } from "../hooks/useExercises";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { getAllExercisesService } from "../services";

export const ModifyExercise = ({ setExercises, setSelected, selected }) => {
  const navigate = useNavigate();
  const { idExercise } = useParams();
  const { token, role } = useContext(AuthContext);
  const { loading, error } = useExercises(idExercise);
  const [modifyError, setModifyError] = useState("");
  const [sending, setSending] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setSending(true);

      const data = new FormData(e.target);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/exercises/${idExercise}/`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: data,
        }
      );
      //vuelvo a realizar la peticion para poder actualizar el estado de exercise
      const exercise = await getAllExercisesService(token);

      //seteo el estado de Exercise y el selected
      setExercises(exercise);
      setSelected(false);

      if (!response.ok) {
        setModifyError("Error modificando ejercicio");
        return;
      }
      alert("Editado correctamente");
      navigate(`/`);
    } catch (e) {
      setModifyError(e.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return role === "admin" ? (
    <section className="modificarSection">
      <form onSubmit={handleForm} className="formulario">
        <h1>Modificar un ejercico</h1>

        <fieldset>
          <label htmlFor="text">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={selected?.name}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="type">tipo</label>

          <select id="type" name="type" required defaultValue={selected?.type}>
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
            defaultValue={selected?.muscle_group}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            required
            defaultValue={selected?.description}
          ></input>
        </fieldset>
        <fieldset>
          {selected?.image ? (
            <>
              <p>imagen actual:</p>
              <figure>
                <img
                  className="imageModificar"
                  src={`${process.env.REACT_APP_BACKEND}/uploads/${selected.image}`}
                  alt={selected.name}
                  width="175px"
                  height="175px"
                />
              </figure>
            </>
          ) : null}
          <label htmlFor="image">Imagen (opcional)</label>
          <input type="file" id="image" name="image" accept="image/*"></input>
        </fieldset>
        <button>Modificar ejercicio</button>
        {sending ? <p>Enviando...</p> : null}
        {modifyError ? <p>{modifyError}</p> : null}
      </form>
    </section>
  ) : (
    <h2>Acceso restringido, loguéate para poder modificar ejercicios</h2>
  );
};
