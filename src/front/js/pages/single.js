import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Register from "../component/register";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <>
      <div className="text-center mt-5">
        <h1>Completa tu registro</h1>
        <Register />
        <br />
        <br />
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
    </>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
