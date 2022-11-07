import { useEffect, useState, useContext, useCallback } from "react";
import { getAllExercisesService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useExercises = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const { token } = useContext(AuthContext);
  const [type, setType] = useState("");
  const [group, setGroup] = useState("");

  //useEffect para inicializar la llamada al backend y obtener el listado de ejercicios
  // a la hora de abrir la página
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await getAllExercisesService(type, group, token);

        setExercises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [type, group, token]);

  const handleType = useCallback((type) => {
    setType(type);
  }, []);

  const handleGroup = useCallback((group) => {
    setGroup(group);
  }, []);

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
    type,
    group,
    setType,
    setGroup,
  };
};
