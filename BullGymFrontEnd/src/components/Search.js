import { memo } from "react";

export const Search = memo(({ filter, handleFilter }) => {
  return (
    <form>
      <label htmlFor="search">Buscar: </label>
      <input id="search" type="search" onChange={handleFilter} />
    </form>
  );
});
