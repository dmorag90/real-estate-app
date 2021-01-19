import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../media/house.jpg";
//import userService from "../services/userService";

class Navbar extends Component {
  state = {
    user: {},
  };

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm border-bottom">
        <div className="container">
          <a href="/">
            <img src={logo} style={{ width: 50, marginRight: 7 }} alt="house" />
          </a>
          <Link className="nav-item navbar-brand" to="/">
            Place4U
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/cards-list">
                    Assets
                  </NavLink>
                </li>
              )}
              {user && user.biz && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/my-cards">
                      My Assets
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signin">
                      Signin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signup">
                      New Seeker
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/biz-signup">
                      New Publisher
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/blank"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user"></i>
                      {" " + user.name}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item" to="my-details">
                        Personnal details
                      </NavLink>

                      <NavLink className="dropdown-item" to="my-password">
                        Change password
                      </NavLink>
                    </div>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
