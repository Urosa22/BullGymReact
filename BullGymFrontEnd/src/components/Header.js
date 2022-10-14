import { Link } from "react-router-dom";
import { Auth } from "./Auth";

export const Header = () => {
  return (
    <header className="header">
      <Link className="Link" to={"/"}>
        {" "}
        <div className="bull"></div>
        <p>Página principal</p>
      </Link>

      <nav className="navBotones">
        <Auth />
      </nav>
    </header>
  );
};
