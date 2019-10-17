import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../utils/SetAuthToken";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };

  loginUser() {
    axios
      .post("/api/signin", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        const { token } = res.data;
        setAuthToken(token);
      });
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
          onSubmit={e => {
            e.preventDefault();
            this.loginUser();
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => this.onChange(e)}
              value={this.state.email}
              id="email"
              type="email"
              style={{ width: "200px" }}
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => this.onChange(e)}
              value={this.state.password}
              id="password"
              type="password"
              style={{ width: "200px" }}
            />
          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
