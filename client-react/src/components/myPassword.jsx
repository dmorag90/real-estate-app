import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";

class MyPassword extends Form {
  state = {
    data: {
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
    },
    errors: {},
  };

  schema = {
    currentPassword: Joi.string().required().min(6).max(1024).label("Password"),
    newPassword: Joi.string().required().min(6).max(1024).label("New Password"),
    confirmedPassword: Joi.string()
      .required()
      .min(6)
      .max(1024)
      .label("New Password"),
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
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log(data);
    if (data.newPassword !== data.confirmedPassword) {
      const { errors } = this.state;
      let { data } = this.state;
      data.confirmedPassword = "";
      errors.confirmedPassword =
        "The confirm is different from the new password";
      this.setState({ errors, data });
      return;
    }
    try {
      await http.patch(`${apiUrl}/users/password`, data);
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
        <PageHeader titleText="Password change" />
        <div className="row">
          <div className="col-12">
            <p>Update your password here</p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-6">
            <h5>Update your password</h5>
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              {this.renderInput(
                "currentPassword",
                "Current Password",
                "password"
              )}
              {this.renderInput(
                "newPassword",
                "New Password",

                "password"
              )}
              {this.renderInput(
                "confirmedPassword",
                "Confirm Password",
                "password"
              )}

              {this.renderButton("Update password")}
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

export default MyPassword;
