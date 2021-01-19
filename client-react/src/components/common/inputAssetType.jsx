import React from "react";
import Form from "./form";
import Joi from "joi-browser";
class InputAssetType extends Form {
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
    bizOffer: Joi.string().min(4).max(255).required(),
    bizType: Joi.string().min(4).max(255).required(),
  };

  render() {
    let error = this.state.errors["bizType"];
    return (
      <div className="form-group">
        <label htmlFor="bizType">Asset Type</label>
        <select
          className="form-control"
          id="bizType"
          name="bizType"
          onInputCapture={this.handleChangeSelect}
        >
          <option value="">Choose...</option>
          <option value="house">Private house</option>
          <option value="apartment">Apartment</option>
          <option value="penthouse">Pentohouse</option>
          <option value="duplex">Duplex</option>
          <option value="dualHouse">Two Family House</option>
          <option value="emptyLot">Empty Lot</option>
          <option value="warehouse">Warehouse</option>
          <option value="farm">Farm</option>
          <option value="studio">Studio/Loft</option>
          <option value="vacation">Vacation apartment/house</option>
          <option value="other">Other</option>
        </select>
        {error && <span className="text-danger">{error}</span>}
        {this.props.children}
      </div>
    );
  }
}

export default InputAssetType;
