import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { authActions } from "../../store/reducers/auth.reducers";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authActions.LOGOUT());
  };

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/plan">Plan</Link>
      </li>
      <li>
        <Link to="/picnics">Picnics</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          Pic
        </Link>
      </h1>
      <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
