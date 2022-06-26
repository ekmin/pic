import React, { Fragment } from "react";

const History = ({ messages }) => {
  return (
    <div>
      <h1 className="large text-dark mtb-1">Update History</h1>
      <div className="profile bg-dark">
        <h4>Name</h4>
        <p>Message</p>
        <p>Date</p>
      </div>
      {messages?.map((item, index) => (
        <div key={index} className="profile bg-light">
          <h4>{item?.name}</h4>
          <p>{item?.text}</p>
          <p>{item?.date}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
