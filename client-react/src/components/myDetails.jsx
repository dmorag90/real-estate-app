import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";

class MyDetails extends Form {
  state = {
    data: {
      name: "",
      email: "",
      newEmail: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(2).max(255).label("Name"),
    email: Joi.string().required().email().label("Email"),
    newEmail: Joi.string().email().label("New email"),
  };

  async componentDidMount() {
    //const user = userService.getCurrentUser();
    //console.log(user);
    const user = await userService.getMyDetails();
    //console.log("From getMyDetails: ", user.data);
    this.setState({ data: this.mapToViewModel(user.data) });
    //console.log("From this.state.data: ", this.state.data);
  }

  mapToViewModel(user) {
    return {
      name: user.name,
      email: user.email,
      newEmail: user.email,
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    //console.log(data);

    try {
      await http.patch(`${apiUrl}/users/`, data);
      toast("Your account has been updated!");
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { errors } = this.state;
        errors.email = "Email is already registered";
        this.setState({ errors: errors });
      }
    }
  };

  handleCancel = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Personnal Details" />
        <div className="row">
          <div className="col-12">
            <p>Update your personnal details</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              {this.renderInput("email", "Email", "text")}
              {this.renderInput("name", "Name", "text")}
              {/* {this.renderInput("password", "Password", "password")} */}
              {this.renderInput("newEmail", "New Email", "text")}
              {this.renderButton("Update")}
              <button
                className="btn btn-secondary float-right"
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

export default MyDetails;
