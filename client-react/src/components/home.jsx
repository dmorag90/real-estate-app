import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
class Home extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader titleText="Place4U Home Page" />
        <div className="row">
          <div className="col-lg-6 sm-12">
            <h4>What is this site for?</h4>
            <p>
              This site is a bulletin board, for houses, apartments, offices and
              any real estate asset that are for sale, rent or sublet. Place4U
              is designed to serve deal makers and it is for free.
            </p>
            <h4> Do you want to publish and asset?</h4>
            <p>
              As a seller of real-estate agent, you may post as many adds as you
              wish. All you need is to signup as a business client and add your
              first post.
              <br />
              After the publication, you will receive calls from potential
              customers. From this point, it is up to you to close the deal.
            </p>
            <br />
            <a href="/biz-signup">
              <p>
                <strong>Register(publisher)</strong>
              </p>
            </a>
            <br></br>
            <br></br>
            <img
              src="https://cdn.pixabay.com/photo/2017/08/30/07/56/money-2696229_1280.jpg"
              className="img-fluid mx-auto d-block"
              width="80%"
              alt=""
            />
            <br />
            <br />
          </div>
          <div className="col-lg-6 sm-12">
            <img
              src="https://cdn.pixabay.com/photo/2015/05/15/14/48/house-768707_1280.jpg"
              alt=""
              className="img-fluid mx-auto d-block"
              width="80%"
            />
            <br />
            <br />
            <h4>Just looking?</h4>
            <p>
              If you are interested in the real estate market, you want to buy
              or rent a place to leave or work, this is the place for you. For
              your convenience, the offers may be filtered by category such as
              place or size and sorted by category ascending or descending at
              your cohice. You may also maintane your favorites list, add or
              remove easily by clicking the bookmark button. Whenever you log in
              to this site, this list will wait for you.
            </p>
            <br />

            <a href="/signup">
              <p>
                <strong>Register (seeker) </strong>
              </p>
            </a>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
