import React, { Component } from "react";
import { FormErrors } from "./FormErrors";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: "",
      email: "",
      gender: "",
      age: "",
      formErrors: { nick: "", email: "", gender: "", age: "" },
      nickValid: false,
      emailValid: false,
      genderValid: false,
      ageValid: false,
      formValid: false
    };
  }

  handleChangeInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nickValid = this.state.nickValid;
    let emailValid = this.state.emailValid;
    let genderValid = this.state.genderValid;
    let ageValid = this.state.ageValid;

    switch (fieldName) {
      case "nick":
        nickValid = value.length >= 3;
        fieldValidationErrors.nick = nickValid ? "" : " is too short";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "gender":
        genderValid = value === "male" || value === "female";
        fieldValidationErrors.gender = genderValid ? "" : " need to choose";
        break;
      case "age":
        ageValid = value > 0;
        fieldValidationErrors.age = ageValid ? "" : " is invalid";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        nickValid: nickValid,
        emailValid: emailValid,
        genderValid: genderValid,
        ageValid: ageValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nickValid &&
        this.state.emailValid &&
        this.state.genderValid &&
        this.state.ageValid
    });
  }

  render() {
    return (
      <form>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div>
          <label htmlFor="nick">Nick</label>
          <input
            type="text"
            name="nick"
            value={this.state.nick}
            onChange={this.handleChangeInput.bind(this)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={this.state.gender === "male"}
            onChange={this.handleChangeInput}
          />
          <label>M</label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={this.state.gender === "female"}
            onChange={this.handleChangeInput}
          />
          <label>F</label>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={this.state.age}
            onChange={this.handleChangeInput}
          />
        </div>
        <button type="submit" disabled={!this.state.formValid}>
          Login
        </button>
      </form>
    );
  }
}
