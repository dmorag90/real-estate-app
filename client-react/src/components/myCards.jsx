import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./card";
import { Link } from "react-router-dom";

class MyCards extends Component {
  state = {
    cards: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();
    if (data.length > 0) this.setState({ cards: data });
  }
  render() {
    const { cards } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="My Assets" />
        <div className="row">
          <div className="col-12">
            <p>
              List of your published adds
              <span className="ml-2">
                <Link to="/create-card">+ Add an Asset</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="row">
          {cards.length > 0 &&
            cards.map((card) => <Card key={card._id} card={card} />)}
        </div>
      </div>
    );
  }
}

export default MyCards;
