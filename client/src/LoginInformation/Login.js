import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


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

  createUser = () => {
    axios.post("http://localhost:3001/api/users", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.passwordConfirmation
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
            e.preventDefaut();
            this.createUser();
          }}
        >
          <div className="input-field col s12">
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
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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
