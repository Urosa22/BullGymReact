import { Exercise } from "../components/Exercise";

export const ExercisePage = ({
  selected,
  favExercise,
  likeExercise,
  removeExercise,
  addExercise,
}) => {
  return (
    <section className="ExercisePage">
      <h1>Ejercicio</h1>
      <Exercise
        exercises={selected}
        favExercise={favExercise}
        likeExercise={likeExercise}
        removeExercise={removeExercise}
        addExercise={addExercise}
      />
    </section>
  );
};
