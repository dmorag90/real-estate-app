import React, { Component } from "react";
import PageHeader from "../components/common/pageHeader";
import CardView from "./cardView";
//import userService from "../services/userService";

class AddFav extends Component {
  state = {
    user: "",
    favs: [],
  };

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    this.addFav(cardId);
  }

  addFav = (cardId) => {
    let { favs } = this.state;
    if (favs.includes(cardId)) {
      favs.splice(favs.indexOf(cardId), 1);
    } else {
      favs.push(cardId);
    }
    this.setState({ favs });
    //console.log(favs);
  };

  render() {
    const { favs } = this.setState;
    return (
      <div className="container">
        <PageHeader titleText="My Favorites" />
        <div className="row">
          <div className="col-12">
            <p>My Favorites cards</p>
          </div>
        </div>
        <div className="row">
          {favs &&
            favs.length > 0 &&
            favs.map((card) => <CardView key={card._id} card={card} />)}
        </div>
      </div>
    );
  }
}

export default AddFav;
