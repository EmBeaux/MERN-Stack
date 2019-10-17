import axios from "axios";
import React, { Component, Fragment } from "react";
import setAuthToken from "../utils/SetAuthToken";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {}
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/api/currentUser?token=${localStorage.token}`)
      .then(res => {
        this.setState({ currentUser: res.data.currentUser });
      });
  }

  logoutUser() {
    setAuthToken();
    window.location.replace("/signin");
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          right: "4px",
          top: "4px",
          display: "flex",
          flexDirection: "row"
        }}
      >
        {this.state.currentUser && (
          <Fragment>
            <h3>{this.state.currentUser.name}</h3>
            <button onClick={() => this.logoutUser()}>Signout</button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Navbar;
