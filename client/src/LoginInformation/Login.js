import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../utils/SetAuthToken"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  loginUser = () => {
    debugger
    axios
      .post("/api/signin", {email: this.state.email, password: this.state.password})
      .then(res => {
        const { token } = res.data;
        // Set token to Auth header
        setAuthToken(token);
        console.log(token)
      })
  };
  render() {
    return (
      <div>
        <div style={{ paddingLeft: "12px" }}>
          <h4>Login below</h4>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.loginUser();
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={this.state.errors.email}
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={this.state.errors.password}
              id="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
