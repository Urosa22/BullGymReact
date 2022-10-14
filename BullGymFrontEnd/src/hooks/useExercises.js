import { useEffect, useState, useContext } from "react";
import { getAllExercisesService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useExercises = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadExercises = async () => {
      //proyecto antiguo no tengo token, lo quito para probar
      try {
        const data = await getAllExercisesService(token);

        setExercises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [token]);

  // Event handler del filtro
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const selectExercise = (id) => {
    setSelected(exercises.find((exercise) => exercise.id === id));
  };

  const addExercise = (exercise) => {
    setExercises([exercise, ...exercises]);
    setSelected(false);
  };
  /* CON ESTO SOLO CONSIGO METER EL EJERCICIO ACTUALIZADO, PERO SIGUE QUEDANDO EL ANTIGUO HASTA QUE SE REFRESCA
LA PÁGINA Y ME DA UN ERROR EN CONSOLA
  const uploadExercise = (exercise) => {
    setExercises([exercise, ...exercises]);
    console.log(exercises);
    exercises.slice(0, 1);
    setSelected(false);
  };
 */
  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
    setSelected(false);
  };

  const likeExercise = (id) => {
    setSelected({
      ...selected,
      likedByMe: !selected.likedByMe,
    });

    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === id) {
          exercise.likedByMe = !exercise.likedByMe;
        }
        return exercise;
      })
    );
  };

  const favExercise = (id) => {
    setSelected({
      ...selected,
      favsByMe: !selected.favsByMe,
    });

    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === id) {
          exercise.favsByMe = !exercise.favsByMe;
        }
        return exercise;
      })
    );
  };
  return {
    loading,
    error,
    exercises,
    filter,
    handleFilter,
    selectExercise,
    selected,
    addExercise,
    removeExercise,
    setExercises,
    setSelected,
    likeExercise,
    favExercise,
    /* uploadExercise, */
  };
};
