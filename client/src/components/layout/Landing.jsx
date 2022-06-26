import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const guestLinks = (
    <div className="buttons">
      <Link to="/register" className="btn btn-primary">
        REGISTER
      </Link>
      <Link to="/login" className="btn btn-light">
        LOGIN
      </Link>
    </div>
  );

  const authLinks = (
    <div className="buttons">
      <Link to="/plan" className="btn btn-primary">
        PLAN
      </Link>
      <Link to="/picnics" className="btn btn-light">
        PICNICS
      </Link>
    </div>
  );

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">PIC</h1>
          <p className="lead">
            Outdoor Picnics are one of the best parts of summer. Don't wait,
            use pic and plan a picnic to make your summer perfect.
          </p>
          {isAuth ? authLinks : guestLinks}
        </div>
      </div>
    </section>
  );
};

export default Landing;
