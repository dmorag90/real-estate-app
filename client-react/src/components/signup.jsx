import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).max(1024).label("Password"),
    name: Joi.string().required().min(2).max(255).label("Name"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.biz = false;
    try {
      await http.post(`${apiUrl}/users`, data);
      toast("Your account has been created!");
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { errors } = this.state;
        errors.email = "Email is already registered";
        this.setState({ errors: errors });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/home"></Redirect>;
    return (
      <div className="container">
        <PageHeader titleText="Register as Asset seeker" />
        <div className="row">
          <div className="col-12">
            <p>Create your account, it's free!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name", "text")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
