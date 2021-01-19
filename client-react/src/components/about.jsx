import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import road from "../media/road.jpg";
import portrait from "../media/portrait.png";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader titleText="About" />
        <div className="row">
          <div className="col-12">
            <img
              src={road}
              alt=""
              width="80%"
              className="img-fluid mx-auto d-block"
            />
          </div>

          <div className="col-lg-6 sm-12 text-justify mt-5">
            <h4>Dani Morag - FullStack Developer</h4>
            <p>
              For more than two decades I was part of the hi-tech industry in
              several roles.<br></br>
              My first steps were in testing complicated telephony systems after
              which I became a team leader.<br></br>
              My next challenge was as a project manager, this was an exciting
              role. I had the opportunity to work with customers from all over
              world, from civilized large cities to deserted and exotic sites.
              In this role, I had to use skills I never thought I will need at
              work, yet it was a satisfying and compensating part of my carrier.
              <br></br>
              The biggest reward was seeing in my own eyes a system being built
              up from scratch and providing the customer with business
              intelligence he was looking for.
            </p>
            Lately, I decided to choose a different path and started learning
            programming. My first choice was Internet Sites Building as this
            profession enables me to see the results of my work and to influence
            how it looks like.<br></br>I enjoy this work and I am willing to get
            more experience as a salaried employee or a free-lancer.
          </div>
          <div className="col-lg-6 sm-12 text-justify mt-5">
            <img
              src={portrait}
              width="70%"
              className="img img-fluid mx-auto d-block"
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 sm-12 mx-auto text-justify mt-5">
            <h4 className="mt-3">Contact details</h4>
            <ul className="list-group">
              <a
                href="mailto:dmorag90@gmail.com"
                className="list-group-item list-group-item-action list-group-item-info"
              >
                Email: dmorag90@gmail.com
              </a>
              <li className="list-group-item list-group-item-info">
                Phone: (+972) 054-544 2279
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
