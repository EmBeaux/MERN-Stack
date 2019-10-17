import axios from "axios";
import React, { Component } from "react";
import setAuthToken from "../utils/SetAuthToken";

const navBarStyles = {
  display: "flex",
  flexDirection: "row",
  background: "#ebf1f6",
  alignItems: "baseline",
  padding: "0 40px",
  margin: "0 auto"
};

const userInfoStyles = {
  alignItems: "baseline",
  display: "flex"
};

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
      <div style={navBarStyles}>
        <div style={{ flexGrow: 1 }}>
          <h1>Todo List</h1>
        </div>
        {this.state.currentUser && (
          <div style={userInfoStyles}>
            <h3>{this.state.currentUser.name}</h3>
            <button
              onClick={() => this.logoutUser()}
              style={{ marginLeft: "24px", marginBottom: "2px" }}
            >
              Signout
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
