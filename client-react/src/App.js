import React, { Component } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import About from "./components/about";
import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import MyDetails from "./components/myDetails";
import MyPassword from "./components/myPassword";
import BizSignup from "./components/bizSignup";
import CreateCard from "./components/createCard";
import MyCards from "./components/myCards";
import EditCard from "./components/editCard";
import DeleteCard from "./components/deleteCard";
import CardsList from "./components/cardsList";
import AddFav from "./components/addFav";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: 750 }}>
          <Switch>
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
            />
            <ProtectedRoute
              path="/my-cards/delete/:id"
              component={DeleteCard}
              biz={true}
            />
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
            />
            <ProtectedRoute path="/my-cards" component={MyCards} biz={true} />
            <Route path="/about" component={About} />
            <Route path="/cards-list" component={CardsList} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/logout" component={Logout} />
            <Route path="/my-details" component={MyDetails} />
            <Route path="/my-password" component={MyPassword} />
            <Route path="/biz-signup" component={BizSignup} />
            <Route path="/add-fav/:id" component={AddFav} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
