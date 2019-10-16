import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/users", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.passwordConfirmation
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ paddingLeft: "12px" }}>
          <h4>Register below</h4>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <form
          noValidate
          onSubmit={this.onSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="name">Name</label>
          <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            type="text"
            style={{ width: "200px" }}
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
            style={{ width: "200px" }}
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            style={{ width: "200px" }}
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="passwordConfirmation"
            type="password"
            style={{ width: "200px" }}
          />
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
            Sign up
          </button>
        </form>
      </div>
    );
  }
}
export default Register;
