import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

const CreatePicnic = () => {
  const navigate = useNavigate();

  const [submit, setSubmit] = useState("");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    picnic_name: "",
    place: "",
    planed_date: "",
    food: "",
    drinks: "",
    games: "",
    things: "",
    guests: "",
    note: "",
    participations: "",
  });

  const {
    picnic_name,
    place,
    planed_date,
    food,
    drinks,
    games,
    things,
    guests,
    note,
    participations,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function submitHandler(event) {
    event.preventDefault();

    try {
      await api.post("/picnic", formData);

      setError(false);
      setSubmit("Picnic Created");

      setFormData({
        picnic_name: "",
        place: "",
        planed_date: "",
        food: "",
        drinks: "",
        games: "",
        things: "",
        guests: "",
        note: "",
        participations: "",
      });

      navigate("/picnics");
    } catch (err) {
      setError(true);
      setSubmit(err.response.data);
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Plan a Picnic</h1>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Picnic Name"
            name="picnic_name"
            value={picnic_name}
            onChange={onChange}
            required
          />
          <small className="form-text">Enter your picnic name</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Place"
            name="place"
            value={place}
            onChange={onChange}
            required
          />
          <small className="form-text">
            Enter the place that you want to go
          </small>
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Planed Date"
            name="planed_date"
            value={planed_date}
            onChange={onChange}
            required
          />
          <small className="form-text">
            Enter your the date that you are plannig to held the picnic
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Food"
            name="food"
            value={food}
            onChange={onChange}
          />
          <small className="form-text">
            Enter the foods that your are going to bring (if there is more than
            one sperate them by adding commas)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Drinks"
            name="drinks"
            value={drinks}
            onChange={onChange}
          />
          <small className="form-text">
            Enter the drinks that your are going to bring (if there is more than
            one sperate them by adding commas)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Games"
            name="games"
            value={games}
            onChange={onChange}
          />
          <small className="form-text">
            Enter the games (Eg:- Badminton, Monopoly, Chess, etc...)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Things"
            name="things"
            value={things}
            onChange={onChange}
            required
          />
          <small className="form-text">
            Enter the things (Eg:- Plates, Blancket, Glasses, etc...)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Guests"
            name="guests"
            value={guests}
            onChange={onChange}
          />
          <small className="form-text">
            Are there any guests for your picnic (if there is more than one
            sperate them by adding commas)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Note"
            name="note"
            value={note}
            onChange={onChange}
          />
          <small className="form-text">Any important note</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Participants"
            name="participations"
            value={participations}
            onChange={onChange}
            required
          />
          <small className="form-text">
            Enter participant who are going to participate to the picnic and{" "}
            <span className="text-danger">
              MAKE SURE TO ADD YOUR NAME ALSO IN THE PARTICIPANT FIELD
            </span>
          </small>

          <p className={`lead ${error ? "text-danger" : "text-success"}`}>
            {submit}
          </p>
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </section>
  );
};

export default CreatePicnic;
