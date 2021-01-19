import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const published = new Date(card.createdAt);
  return (
    <div className="col-md-6 col-lg-4 col-sm-12 mt-3">
      <div className="card mt-3">
        <img
          className="card-image-top p-2"
          src={card.bizImage}
          width="100%"
          alt={card.bizName}
        />
        <div className="card-body">
          <h5 className="card-title">{card.bizName}</h5>
          <h5 className="card-text">{card.bizOffer}</h5>
          <p className="card-text">{card.bizDescription}</p>
          <p className="card-text border-top pt-2"></p>
          <p className="card-text ">Type: {card.bizType}</p>
          <p className="card-text ">Area(sq.mr): {card.bizArea}</p>
          <p className="card-text">Rooms: {card.bizRooms}</p>
          <p className="card-text">
            Price ($): {card.bizPrice.toLocaleString("il")}
          </p>
          <p className="card-text">City: {card.bizAddress}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b>
            {card.bizPhone.replace(
              /([02,03,04,08,09]{2}|\d{3})(\d{3})(\d{3,4})/,
              "$1 - $2 $3"
            )}
            <br />
          </p>
          <p className="card-text">
            Published on: {published.getDate()}/{published.getMonth() + 1}/
            {published.getFullYear()}
          </p>
          <p className="card-text">Published by: {card.bizPublisher}</p>
        </div>

        <div className="card-footer text-align-bottom">
          <small className="text-muted">
            <Link to={`/my-cards/edit/${card._id}`}>Edit</Link>
            <Link
              className="ml-5 text-danger"
              to={`/my-cards/delete/${card._id}`}
            >
              Delete
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Card;
