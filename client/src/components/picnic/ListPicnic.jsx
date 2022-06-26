import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";

import ListItem from "./ListItem";

const ListPicnic = () => {
  const [picnics, setPicnics] = useState([]);

  useEffect(() => {
    const getPicnics = async () => {
      const res = await api.get("/picnic/user");

      const responseData = await res.data;

      const loadedPicnics = [];

      for (const key in responseData) {
        loadedPicnics.push({
          id: key,
          _id: responseData[key]._id,
          picnic_name: responseData[key].picnic_name,
          place: responseData[key].place,
          planed_date: responseData[key].planed_date,
          victuals: responseData[key].victuals,
          games: responseData[key].games,
          things: responseData[key].things,
          guests: responseData[key].guests,
          note: responseData[key].note,
          participations: responseData[key].participations,
        });
      }

      setPicnics(loadedPicnics);
    };
    getPicnics().catch((error) => {
      console.log(error);
    });
  }, []);

  const listItem = picnics.map((picnic) => (
    <ListItem
      key={picnic.id}
      id={picnic._id}
      picnic_name={picnic.picnic_name}
      place={picnic.place}
      planed_date={picnic.planed_date}
      victuals={picnic.victuals}
      games={picnic.picnic_games}
      things={picnic.picnic_things}
      guests={picnic.guests}
      note={picnic.picnic_note}
      participations={picnic.participations}
    />
  ));

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Picnics</h1>
        <div>
          {listItem.length === 0 ? <h1>No Picnics Found...</h1> : listItem}
        </div>
      </Fragment>
    </section>
  );
};

export default ListPicnic;
