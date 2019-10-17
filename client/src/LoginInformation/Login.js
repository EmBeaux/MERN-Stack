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
  }

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
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "400px",
          padding: "80px 80px",
          margin: "200px auto",
          background: "#ebf1f6"
        }}
      >
        <div>
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
              onChange={e => this.onChange(e)}
              value={this.state.email}
              id="email"
              type="email"
              style={{ width: "200px" }}
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={e => this.onChange(e)}
              value={this.state.password}
              id="password"
              type="password"
              style={{ width: "200px" }}
            />
          </div>
          <button type="submit" style={{marginTop: "4px"}}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
