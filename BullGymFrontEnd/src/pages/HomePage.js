import { Exercise } from "../components/Exercise";
import { ListExercises } from "../components/ListExercises";
import { Search } from "../components/Search";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Bull } from "../components/Bull";

export const HomePage = ({
  loading,
  error,
  handleFilter,
  selectExercise,
  selected,
  removeExercise,
  likeExercise,
  filter,
  exercises,
  favExercise,
  addExercise,
}) => {
  const { role } = useContext(AuthContext);

  const filteredExercise = filter
    ? exercises.filter((exercise) => exercise.name.includes(filter))
    : exercises;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {role === "normal" || role === "admin" ? (
        <section className="Homepage">
          <>
            <menu className="menuHome">
              <h1>Ejercicios</h1>
              <Search handleFilter={handleFilter} />
              <ListExercises
                exercises={filteredExercise}
                selectExercise={selectExercise}
                addExercise={addExercise}
              ></ListExercises>
            </menu>
            <Exercise
              exercises={selected}
              removeExercise={removeExercise}
              likeExercise={likeExercise}
              favExercise={favExercise}
              addExercise={addExercise}
            />
          </>
        </section>
      ) : (
        <section className="Registrate1">
          <h1 className="Bienvenido">
            Bienvenido, regístrate para visualizar los ejercicios
          </h1>
          <Bull></Bull>
        </section>
      )}
    </>
  );
};
