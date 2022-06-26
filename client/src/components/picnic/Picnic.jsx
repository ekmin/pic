import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

import History from "./History";

const Picnic = () => {
  const navigate = useNavigate();

  const [submit, setSubmit] = useState("");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    picnic_name: "",
    place: "",
    planed_date: "",
    victuals: [],
    games: [],
    things: [],
    guests: [],
    note: "",
    participations: [],
  });

  const [text, setText] = useState("");

  const {
    picnic_name,
    place,
    planed_date,
    victuals,
    games,
    things,
    guests,
    note,
    participations,
  } = formData;

  const id = useParams();

  useEffect(() => {
    const getPicnicById = async () => {
      try {
        const res = await api.get(`/picnic/${id.id}`);

        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPicnicById();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/picnic/${id.id}`, formData);
      const { data: message } = await api.post(`/picnic/message/${id.id}`, {
        text,
      });
      setFormData((prevData) => ({
        ...prevData,
        messages: [message, ...prevData.messages],
      }));

      setError(false);
      setSubmit("Picnic Updated");
    } catch (err) {
      setError(true);
      setSubmit(err.response.data);
    }
  };

  const deletePicnic = async () => {
    try {
      await api.delete(`/picnic/${id.id}`);
      navigate("/picnics");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Picnic</h1>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Picnic Name"
              name="picnic_name"
              value={picnic_name}
              onChange={onChange}
            />
            <small className="form-text">Picnic Name</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Place"
              name="place"
              value={place}
              onChange={onChange}
            />
            <small className="form-text">Place</small>
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Planed Date"
              name="planed_date"
              value={planed_date}
              onChange={onChange}
            />
            <small className="form-text">Planed Date</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Food"
              name="food"
              value={victuals[0]?.food}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  victuals: [
                    {
                      food: e.target.value,
                      drinks: prevData.victuals[0]?.drinks,
                    },
                  ],
                }));
              }}
            />
            <small className="form-text">Foods</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Drinks"
              name="drinks"
              value={victuals[0]?.drinks}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  victuals: [
                    {
                      food: prevData.victuals[0]?.food,
                      drinks: e.target.value,
                    },
                  ],
                }));
              }}
            />
            <small className="form-text">Drinks</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Games"
              name="games"
              value={games}
              onChange={onChange}
            />
            <small className="form-text">Games</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Things"
              name="things"
              value={things}
              onChange={onChange}
            />
            <small className="form-text">Things</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Guests"
              name="guests"
              value={guests}
              onChange={onChange}
            />
            <small className="form-text">Guests</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Note"
              name="note"
              value={note}
              onChange={onChange}
            />
            <small className="form-text">Note</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Participations"
              name="participations"
              value={participations}
              onChange={onChange}
            />
            <small className="form-text">Participants</small>
          </div>
          <hr />
          <div className="form-group">
            <input
              type="text"
              placeholder="Why are you updating this..."
              name="text"
              value={text}
              onChange={onChangeText}
              required
            />
            <p className={`lead ${error ? "text-danger" : "text-success"}`}>
              {submit}
            </p>
          </div>
          <input type="submit" className="btn btn-primary" value="Update" />
        </form>
        <History messages={formData.messages} />
        <hr />
        <button className="btn btn-danger mt-1" onClick={deletePicnic}>
          Delete Picnic
        </button>
      </section>
    </Fragment>
  );
};

export default Picnic;
