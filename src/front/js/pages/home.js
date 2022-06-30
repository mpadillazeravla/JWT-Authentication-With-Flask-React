import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Form from "../component/form";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido!!</h1>
      <Form />
      <br />
      <Link to="/register">
        <button className="btn btn-warning">Registrarse</button>
      </Link>
    </div>
  );
};
