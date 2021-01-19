import React, { Component } from "react";
import Input from "./input";

import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} }); // if errors exist, set them in the state, else put empty object in the state. the below is the longer way to do tahat
    /*if (errors){
        this.setState({errors:errors});
    } else{
        this.setState({errors:{}});
    }*/
    if (errors) return;
    this.doSubmit();
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    //console.log(errors);
    return errors;
  };
  //validate property checks each field separately
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    //never ever mutante the state directly
    //the errors handling is done during typing of the input into the field by the client

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const { data } = this.state;

    //const data = {...this.state.data} // another way to enter the object data into a variable
    data[input.name] = input.value;
    this.setState({ data, errors });
    //the state of Signup is getting updated with the value entered into the fields
  };

  handleChangeCity = (input) => {
    //never ever mutante the state directly
    //the errors handling is done during typing of the input into the field by the client
    //console.log(input);

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const { data } = this.state;

    //const data = {...this.state.data} // another way to enter the object data into a variable
    data[input.name] = input.value;
    this.setState({ data, errors });
    //the state of Signup is getting updated with the value entered into the fields
  };

  renderInput(name, label, type, min, max, step) {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        name={name}
        label={label}
        type={type}
        min={min}
        max={max}
        step={step}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
  renderButton(label) {
    return (
      // the button is disabled until the validate method returns null(no errors)
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
