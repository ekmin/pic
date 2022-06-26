import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/reducers/auth.reducers";
import api from "../../utils/api";

function Login() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = { email, password };

    try {
      const res = await api.post("/login", body);

      dispatch(authActions.LOGIN_SUCCESS(res.data));

      try {
        const res = await api.get("/login");

        dispatch(authActions.USER_LOADED(res.data));
      } catch (err) {
        console.log(err);
        dispatch(authActions.AUTH_ERROR());
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => setError(error.msg));
      }

      dispatch(authActions.LOGIN_FAIL());
    }
  };

  if (isAuth) {
    return <Navigate to="/plan" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        Login to Your Account
      </p>
      <form className="form" onSubmit={submitHandler}>
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
          <p className="lead text-danger">{error}</p>
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default Login;
