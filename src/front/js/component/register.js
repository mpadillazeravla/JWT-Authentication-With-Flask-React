import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [newemail, setNewemail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const { store, actions } = useContext(Context);

  const handleRegister = (e) => {
    e.preventDefault();
    actions.register(newemail, newpassword);
  };
  //   condicion ? true : false
  return (
    <>
      <div className="container col-6 d-flex justify-content-center">
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setNewemail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setNewpassword(e.target.value)}
            />
            <label htmlFor="exampleInputPassword2" className="form-label">
              Re-type Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              //   onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Completar registro
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
