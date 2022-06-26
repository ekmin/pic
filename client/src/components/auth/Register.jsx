import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { authActions } from "../../store/reducers/auth.reducers";
import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

function Register() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function submitHandler(event) {
    event.preventDefault();

    if (password !== password2) {
      setError("Passwords Do Not Match");
    } else {
      try {
        const res = await api.post("register", formData);

        dispatch(authActions.REGISTER_SUCCESS(res.data));

        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
        try {
          const res = await api.get("/login");

          dispatch(authActions.USER_LOADED(res.data));
        } catch (err) {
          dispatch(authActions.AUTH_ERROR());
        }
      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => setError(error.msg));
        }

        dispatch(authActions.AUTH_ERROR());
      }
    }
  }

  if (isAuth) {
    return <Navigate to="/plan" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Register</h1>
      <p className="lead">
        Create Your Account
      </p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <p className="lead text-danger">{error}</p>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default Register;
