import { memo } from "react";

export const ListExercises = memo(({ exercises, selectExercise }) => {
  if (exercises?.length === 0) return <p>No hay resultados</p>;
  return (
    <menu className="ListExercises">
      {exercises?.map((exercises) => {
        return (
          <li
            key={exercises?.id}
            onClick={() => {
              selectExercise(exercises?.id);
            }}
          >
            {exercises?.name}
          </li>
        );
      })}
    </menu>
  );
});
