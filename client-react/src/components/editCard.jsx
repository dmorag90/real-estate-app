import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { cities } from "../data/cities.js";

class EditCard extends Form {
  state = {
    data: {
      bizName: "",
      bizOffer: "",
      bizDescription: "",
      bizType: "",
      bizArea: 0,
      bizRooms: 0,
      bizPrice: 0,
      bizAddress: "",
      bizPhone: "",
      bizPublisher: "",
      bizImage: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    bizName: Joi.string().min(2).max(255).required(),
    bizOffer: Joi.string().min(4).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizType: Joi.string().min(4).max(400).required(),
    bizArea: Joi.number().min(1).max(100000).required(),
    bizRooms: Joi.number().min(1).max(10000).required(),
    bizPrice: Joi.number().min(0).max(100000000),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^[0][2-9][0-9]{7,8}$/),
    bizPublisher: Joi.string().min(2).max(255).required(),
    bizImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(card) {
    return {
      _id: card._id,
      bizName: card.bizName,
      bizOffer: card.bizOffer,
      bizDescription: card.bizDescription,
      bizType: card.bizType,
      bizArea: card.bizArea,
      bizRooms: card.bizRooms,
      bizPrice: card.bizPrice,
      bizAddress: card.bizAddress,
      bizPhone: card.bizPhone,
      bizPublisher: card.bizPublisher,
      bizImage: card.bizImage,
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    await cardService.editCard(data);
    toast("The card is updated");
    this.props.history.replace("/my-cards");
  };

  handleCancel = () => {
    this.props.history.push("/my-cards");
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Publisher Form" />
        <div className="row">
          <div className="col-12">
            <p>Update your offer</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              {this.renderInput("bizName", " Asset Name/address")}
              <div className="form-group">
                <label htmlFor="bizOffer">Deal Type</label>
                <select
                  className="form-control"
                  id="bizOffer"
                  name="bizOffer"
                  onInputCapture={this.handleChange}
                >
                  <option key="0" value="">
                    Choose...
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
                {this.state.errors["bizOffer"] && (
                  <span className="text-danger">
                    {this.state.errors["bizOffer"]}
                  </span>
                )}
              </div>

              {this.renderInput("bizDescription", "Asset Description")}
              <div className="form-group">
                <label htmlFor="bizType">Asset Type</label>
                <select
                  className="form-control"
                  id="bizType"
                  name="bizType"
                  onInputCapture={this.handleChange}
                >
                  <option key="0" value="">
                    Choose...
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
                {errors["bizType"] && (
                  <span className="text-danger">{errors["bizType"]}</span>
                )}
              </div>
              {this.renderInput("bizArea", "Asset squared meters")}
              {this.renderInput(
                "bizRooms",
                "Number of rooms",
                "number",
                "1",
                "100",
                "0.5"
              )}
              {this.renderInput("bizPrice", "Requested price (USD)")}
              <label>City Name:</label>
              <Autocomplete
                className="form-control"
                id="bizAddress"
                name="bizAddress"
                options={cities}
                getOptionLabel={(option) => option.city}
                style={{ width: "33.7rem" }}
                onInputChange={(e, newValue) =>
                  this.handleChangeCity({ name: "bizAddress", value: newValue })
                }
                renderInput={(params) => (
                  <TextField {...params} label="" variant="standard" />
                )}
              />
              {/* {this.renderInput("bizAddress", "City")} */}
              {this.renderInput("bizPhone", "Contact Phone", "tel")}
              {this.renderInput("bizPublisher", "Published by", "text")}
              {this.renderInput("bizImage", "Asset Image")}
              {this.renderButton("Update Card")}
              <button
                className="btn btn-secondary ml-4"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
