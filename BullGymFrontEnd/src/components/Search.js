import { memo } from "react";

export const Search = memo(
  ({ handleFilter, type, group, setType, setGroup }) => {
    return (
      <>
        <form className="buscador">
          {/* <label htmlFor="search"></label>
          <input
            id="search"
            type="search"
            onChange={handleFilter}
            placeholder="Buscar por nombre"
          /> */}

          <div>
            <select onChange={(e) => setType(e.target.value)} value={type}>
              <option value="">Filtrar por tipo</option>
              <option value="cardio">cardio</option>
              <option value="sala de musculacion">Sala de musculación</option>
            </select>

            {type ? (
              <button className="buttonX" onClick={() => setType("")}>
                X
              </button>
            ) : null}
          </div>
          <div>
            <select onChange={(e) => setGroup(e.target.value)} value={group}>
              <option value="">Filtrar por grupo muscular</option>
              <option value="pecho">Pecho</option>
              <option value="espalda">Espalda</option>
              <option value="hombros">Hombros</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="piernas">Piernas</option>
              <option value="cuadriceps">Cuadriceps</option>
              <option value="biceps femoral">Biceps femoral</option>
              <option value="gemelos">Gemelos</option>

              <option value="abdominales">Abdominales</option>
              <option value="abdominales inferiores">
                Abdominales inferiores
              </option>
              <option value="oblicuos">Oblicuos</option>
              <option value="lumbares">Lumbares</option>
            </select>
            {group ? (
              <button className="buttonX" onClick={() => setGroup("")}>
                X
              </button>
            ) : null}
          </div>
        </form>
      </>
    );
  }
);

/* export const Search = memo(({ type, group, setType, setGroup }) => {
  return (
   
  );
}); */
