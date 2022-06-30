import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getUserInfo();
  }, []);
  return (
    <>
      <br />
      <br />
      <div className="container col-6 d-flex justify-content-center">
        <div
          className="card text-dark bg-light mb-3 text-center"
          style={{ maxWidth: "18rem" }}
        >
          <img
            src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600119/59070200-icono-de-usuario-hombre-perfil-hombre-de-negocios-avatar-icono-persona-en-la-ilustraci%C3%B3n-vectorial.jpg"
            className="card-img-top"
            alt="profile"
          />
          <div className="card-body">
            <h5 className="card-title">User email adress:</h5>
            <p className="card-text">{store.userInfo}</p>
          </div>
        </div>
      </div>

      <div className="container col-6 d-flex justify-content-center">
        <Link to="/">
          <button className="btn btn-primary">Back home</button>
        </Link>
      </div>
    </>
  );
};
