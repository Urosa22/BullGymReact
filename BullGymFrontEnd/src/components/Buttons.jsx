import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addFavoriteService /* likeExerciseService */ } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { deleteExerciseService } from "../services";
import { useState } from "react";

export const Buttons = ({
  exercises,
  removeExercise,
  likeExercise,
  favExercise,
}) => {
  const { role, token } = useContext(AuthContext);
  /* const [like, setLike] = useState(undefined); */
  const [favs, setFavs] = useState(undefined);
  const [error, setError] = useState("");
  console.log(favs);

  //useEffect para los likes,donde, en caso de existir exercises, seteamos like a true o false, dependiendo su estado actual
  //para que así pueda cambiar(más abajo) el background_image
  /*  useEffect(() => {
    exercises?.likedByMe ? setLike(true) : setLike(false);
  }, [exercises]); */

  //Creamos la función manejadora que estará presente en el botón de like para agregar o quitar el like
  //En la cual realizamos una petición al backend

  /*  const handleLikeButton = async () => {
    try {
      await likeExerciseService(exercises.id, token);

      likeExercise(exercises.id);
    } catch (error) {
      setError(error.message);
    }
  }; */

  //useEffect para los favs, mismo funcionamiento que los likes
  useEffect(() => {
    exercises?.favsByMe ? setFavs(true) : setFavs(false);
  }, [exercises]);

  //Creamos Una misma función para los favoritos

  const handleFavsButton = async () => {
    try {
      await addFavoriteService(exercises.id, token);
      favExercise(exercises.id);
      console.log(favs);
    } catch (error) {
      setError(error.message);
    }
  };
  // Probar a realizar un map de favs y el que sea false, borrarlo.

  //Con esta función borramos los ejercicios y el remove es para que al isntante
  // se actualice la  lista de ejercicios
  const deleteExercise = async (id) => {
    try {
      await deleteExerciseService(id, token);
      removeExercise(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className="botones">
        {role === "admin" ? (
          <button
            onClick={() => deleteExercise(exercises.id)}
            className="delete"
          ></button>
        ) : null}
        {role === "admin" ? (
          <Link className="Link" to={`/exercises/${exercises.id}/edit`}>
            <button className="Modificar"></button>
          </Link>
        ) : null}

        {error ? <p>{error}</p> : null}
        {role === "normal" ? (
          <button
            onClick={handleFavsButton}
            className={favs ? "favorito" : "favoritoNo"}
          ></button>
        ) : null}

        {/*       {role === "normal" ? (
          <button
            onClick={handleLikeButton}
            className={like ? "likeSi" : "likeNo"}
          ></button>
        ) : null} */}
      </section>
    </>
  );
};
