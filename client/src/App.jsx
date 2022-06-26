import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreatePicnic from "./components/picnic/CreatePicnic";
import PrivateRoute from "./components/routing/PrivateRoute";
import ListPicnic from "./components/picnic/ListPicnic";
import Picnic from "./components/picnic/Picnic";

import api from "./utils/api";
import setAuthToken from "./utils/setAuthToken";

import { authActions } from "./store/reducers/auth.reducers";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
          const res = await api.get("/login");

          dispatch(authActions.USER_LOADED(res.data));
        } catch (err) {
          dispatch(authActions.AUTH_ERROR());
        }
      }
    };

    loadUser();

    window.addEventListener("storage", () => {
      if (!localStorage.token) dispatch(authActions.LOGOUT());
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/plan"
          element={<PrivateRoute component={<CreatePicnic />} />}
        />
        <Route
          path="/picnics"
          element={<PrivateRoute component={<ListPicnic />} />}
        />
        <Route
          path="/picnic/:id"
          element={<PrivateRoute component={<Picnic />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
