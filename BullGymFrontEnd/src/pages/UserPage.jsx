import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useExercises } from "../hooks/useExercises";
import { Buttons } from "../components/Buttons";
import { Exercise } from "../components/Exercise";

export const UserPage = ({
  addExercise,
  removeExercise,
  likeExercise,
  favExercise,
  selected,
}) => {
  const { exercises } = useExercises();
  console.log(exercises);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  return user ? (
    <>
      <section className="userPage">
        <h2>Bienvenido, usuario número {id}</h2>
        <h3>{user.username}</h3>
        <h4>{user.email}</h4>
        <p>Registrado el {new Date(user.createdAt).toLocaleString()}</p>

        <h1>Ejercicios favoritos</h1>
        <article className="articleFavs">
          {exercises.map((exercises) => {
            return exercises?.favsByMe === 1 ? (
              <section className="Exercise" key={exercises.id}>
                <h3>Nombre: {exercises.name}</h3>
                {exercises.image ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${exercises.image}`}
                    alt={exercises.description}
                    width="150px"
                    height="150px"
                  ></img>
                ) : null}
                <h4>Tipo: {exercises.type}</h4>{" "}
                <h5>Grupo muscular: {exercises.muscle_group}</h5>
                <p>Descripción: {exercises.description} </p>
                <p>
                  Creado el {new Date(exercises.createdAt).toLocaleString()}
                </p>
                <Buttons
                  exercises={exercises}
                  addExercise={addExercise}
                  removeExercise={removeExercise}
                  likeExercise={likeExercise}
                  favExercise={favExercise}
                ></Buttons>
              </section>
            ) : null;
          })}
        </article>
      </section>
    </>
  ) : (
    <h2> Necesitas estar logueado para ver tus datos</h2>
  );
};
