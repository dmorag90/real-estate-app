import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import CardView from "./cardView";
import userService from "../services/userService";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { cities } from "../data/cities.js";

class CardsList extends Component {
  state = {
    cards: [],
    cardsPool: [],
    user: {},
    favs: [],
    options: { category: "bizName", order: "asc", favs: "all" },
    filters: {
      bizOffer: "All",
      bizType: "All",
      bizAddress: "",
      bizRoomsMin: 0,
      bizRoomsMax: 100,
      bizPriceMin: 0,
      bizPriceMax: 10000000,
    },
    filtersDefault: {
      bizOffer: "All",
      bizType: "All",
      bizAddress: "",
      bizRoomsMin: 0,
      bizRoomsMax: 100,
      bizPriceMin: 0,
      bizPriceMax: 10000000,
    },
  };

  async componentDidMount() {
    const { data } = await cardService.getCardsList();
    const cards = await userService.getFavList();
    //console.log("fav list from db: ", cards.data);

    document.getElementById("bizOffer").value = "All";
    document.getElementById("bizType").value = "All";
    document.getElementById("bizAddress").value = "";
    document.getElementById("bizRoomsMin").value = 0;
    document.getElementById("bizRoomsMax").value = 0;
    document.getElementById("bizPriceMin").value = 0;
    document.getElementById("bizPriceMax").value = 0;

    const filtersDefault = { ...this.state.filtersDefault };
    if (data.length > 0) {
      this.setState(
        {
          cards: data,
          cardsPool: data,
          favs: cards.data,
          filters: filtersDefault,
        },
        () => {
          this.sortBy();
          //console.log("filter default: ", this.state.filters, filtersDefault);
        }
      );
      //this.sortBy();
    }
  }

  filteredSearch = () => {
    //this.componentDidMount();

    const { filters, cardsPool } = this.state;
    let filteredCards = [];
    let tempCards = [];
    let cards = [...cardsPool];
    //console.log("cardsPool: ", cardsPool);
    if (filters.bizOffer === "All") {
      filteredCards = [...cardsPool];
    } else {
      cards.forEach((card) => {
        //console.log("filters.bizOffer: ", filters.bizOffer, card);
        if (card.bizOffer === filters.bizOffer) {
          filteredCards.push(card);
        }
      });
    }
    if (filters.bizType === "All") {
      tempCards = [...filteredCards];
    } else {
      filteredCards.forEach((card) => {
        if (card.bizType === filters.bizType) {
          tempCards.push(card);
        }
      });
    }
    filteredCards = [];
    tempCards.forEach((card) => {
      if (
        card.bizRooms >= filters.bizRoomsMin &&
        card.bizRooms <= filters.bizRoomsMax
      ) {
        filteredCards.push(card);
      }
    });

    tempCards = [];

    filteredCards.forEach((card) => {
      // console.log("Price : ", card.bizPrice);
      // console.log("Filter Price : ", filters.bizPriceMin, filters.bizPriceMax);
      if (
        card.bizPrice >= filters.bizPriceMin &&
        card.bizPrice <= filters.bizPriceMax
      ) {
        tempCards.push(card);
      }
    });

    //console.log("temp cards after price: ", tempCards);
    filteredCards = [];
    tempCards.forEach((card) => {
      if (card.bizAddress === filters.bizAddress || filters.bizAddress === "") {
        filteredCards.push(card);
      }
    });

    //console.log("filtered cards: ", filteredCards);
    //console.log("temp cards: ", tempCards);
    // console.log("cards: ", cards);
    this.setState({ cards: filteredCards }); //does not work!!!I don't know why

    //console.log(this.state.cards);
  };

  onHandleBizFilter = (e) => {
    //console.log(e.target.value);
    const { filters } = this.state;
    const value = e.target.value;
    const name = e.target.name;
    filters[name] = value;

    this.setState({ filters });
    //console.log(this.state.filters);
  };
  onHandleFavList = (e) => {
    const { cards, favs, options } = this.state;
    let filteredCards = [];
    options.favs = e.target.value;
    this.setState({ options });
    if (options.favs === "favs") {
      cards.forEach((card) => {
        if (favs.includes(card._id)) {
          //console.log(cards.indexOf(card));
          filteredCards.push(card);
        }
      });
      this.setState({ cards: filteredCards });
    }
    if (options.favs === "all") {
      this.componentDidMount();
    }
  };

  onHandleOrder = (e) => {
    const { options } = this.state;
    options.order = e.target.value;
    this.setState({ options });
    //console.log("options object: " + this.state.options.order);
    this.sortBy();
  };

  onHandleCategory = (e) => {
    const { options } = this.state;
    options.category = e.target.value;

    this.setState({ options });
    this.sortBy();
    //console.log("options object: " + this.state.options.category);
  };

  sortBy = () => {
    const { cards, options } = this.state;
    let dir = options.order;
    let field = options.category;
    let x, y;
    if (cards.length > 0) {
      let sorted = cards.sort(function (a, b) {
        if (typeof a[field] == "string") {
          x = a[field].toLowerCase();
          y = b[field].toLowerCase();
        } else {
          x = a[field];
          y = b[field];
        }

        if (dir === "asc") dir = -1;
        if (dir === "desc") dir = 1;
        if (x < y) {
          return dir;
        }
        if (x > y) {
          return -dir;
        }
        return 0;
      });

      this.setState({ cards: sorted });
      this.render();
    }
  };

  onHandleFav = (cardId) => {
    let { favs } = this.state;
    if (favs.includes(cardId)) {
      favs.splice(favs.indexOf(cardId), 1);
    } else {
      favs.push(cardId);
    }
    this.doSubmit(favs);
    this.setState({ favs });
  };

  doSubmit = async (cards) => {
    await userService.updateCards(cards);
    toast("Your favorites list was updated");
    return;
  };

  render() {
    const { cards, favs } = this.state;
    //console.log("cards from render: ", cards);

    return (
      <div className="container">
        <PageHeader titleText="Find your Asset" />
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="filterBy">Deal Type</label>
            <select
              name="bizOffer"
              id="bizOffer"
              className="form-control"
              onInputCapture={this.onHandleBizFilter}
            >
              <option key="0" value="All">
                All
              </option>
              <option key="1" value="For Sale">
                For Sale
              </option>
              <option key="2" value="For Rent">
                For Rent
              </option>
              <option key="3" value="Sublet">
                Sublet
              </option>
            </select>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="bizType">Asset Type</label>
            <select
              className="form-control"
              id="bizType"
              name="bizType"
              onInputCapture={this.onHandleBizFilter}
            >
              <option key="0" value="All">
                All
              </option>
              <option key="1" value="Private house">
                Private house
              </option>
              <option key="2" value="Apartment">
                Apartment
              </option>
              <option key="3" value="Penthouse">
                Pentohouse
              </option>
              <option key="4" value="Duplex">
                Duplex
              </option>
              <option key="5" value="Two Family House">
                Two Family House
              </option>
              <option key="6" value="Empty Lot">
                Empty Lot
              </option>
              <option key="7" value="Warehouse">
                Warehouse
              </option>
              <option key="8" value="Farm">
                Farm
              </option>
              <option key="9" value="Studio">
                Studio/Loft
              </option>
              <option key="10" value="Vacation Unit">
                Vacation Unit
              </option>
              <option key="11" value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group ml-3">
            <label htmlFor="bizRoomsMin">Rooms (from)</label>
            <input
              className="form-control"
              id="bizRoomsMin"
              name="bizRoomsMin"
              type="number"
              min="0"
              max={this.state.filters.bizRoomsMax}
              step="0.5"
              onInputCapture={this.onHandleBizFilter}
            ></input>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="bizRoomsMax">Rooms (to)</label>
            <input
              className="form-control"
              id="bizRoomsMax"
              name="bizRoomsMax"
              type="number"
              min={this.state.filters.bizRoomsMin}
              max="1000"
              step="0.5"
              onInputCapture={this.onHandleBizFilter}
            ></input>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="bizPriceMin">Price (from)</label>
            <input
              className="form-control"
              id="bizPriceMin"
              name="bizPriceMin"
              type="number"
              min="0"
              max={this.state.filters.bizPriceMax}
              step="5000"
              onInputCapture={this.onHandleBizFilter}
            ></input>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="bizPriceMax">Price (to)</label>
            <input
              className="form-control"
              id="bizPriceMax"
              name="bizPriceMax"
              type="number"
              min={this.state.filters.bizPriceMin}
              max="100000000"
              step="5000"
              onInputCapture={this.onHandleBizFilter}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="form-group ml-3">
            <label htmlFor="bizAddress">City Name:</label>
            <Autocomplete
              className="form-control"
              id="bizAddress"
              name="bizAddress"
              options={cities}
              getOptionLabel={(option) => option.city}
              style={{ width: 200 }}
              clearOnEscape={true}
              onInputChange={(e, newValue) =>
                this.onHandleBizFilter({
                  target: { value: newValue, name: "bizAddress" },
                })
              }
              renderInput={(params) => (
                <TextField
                  id="bizAddress"
                  {...params}
                  label=""
                  variant="standard"
                  placeholder="All"
                />
              )}
            />
          </div>
          <div className="form-group ml-5  ">
            <label htmlFor="searchButton"></label>
            <button
              id="searchBtn"
              type="button"
              className="btn btn-outline-success btn-md "
              onClick={this.filteredSearch}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="form-group ml-3 ">
            <label htmlFor="searchButton"></label>
            <button
              id="resetBtn"
              type="button"
              className="btn btn-outline-danger btn-md"
              onClick={() => {
                this.componentDidMount();
              }}
            >
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="sortBy">Sort by</label>
            <select
              name="sortBy"
              id="sortBy"
              className="form-control"
              onInputCapture={this.onHandleCategory}
            >
              <option value="bizName">Asset Name</option>
              <option value="bizAddress">City</option>
              <option value="bizPrice">Price</option>
              <option value="bizType">Type</option>
              <option value="bizRooms">Rooms</option>
              <option value="bizArea">Area</option>
              <option value="createdAt">Date posted</option>
            </select>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="sortBy">Order</label>
            <select
              name="orderBy"
              id="orderBy"
              className="form-control"
              onInputCapture={this.onHandleOrder}
            >
              <option value="asc" key="asc">
                Ascending
              </option>
              <option value="desc" key="desc">
                Descending
              </option>
            </select>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="sortBy">My Favorites</label>
            <select
              name="myFavorites"
              id="myFavorites"
              className="form-control"
              onInputCapture={this.onHandleFavList}
            >
              <option value="all">All</option>
              <option value="favs">Favorites</option>
            </select>
          </div>
        </div>
        <div className="card-group">
          {cards.length > 0 &&
            cards.map((card) => (
              <CardView
                key={card._id}
                card={card}
                onHandleFav={this.onHandleFav}
                favs={favs}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default CardsList;
