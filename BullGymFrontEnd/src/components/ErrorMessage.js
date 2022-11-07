import { Link } from "react-router-dom";
//componente creado para mostrar (en caso de que de lugar a ello) el error que tenemos en el backend
// y poder llevar a la página de inicio al usuario

export const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <h1>Error</h1>
      <p>{message}</p>
      <Link to={"/"}>Volver al inicio</Link>
    </section>
  );
};
