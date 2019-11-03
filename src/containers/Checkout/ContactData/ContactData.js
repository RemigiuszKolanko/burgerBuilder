import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Remik",
        address: {
          street: "TestStreet",
          zipCode: "50-538",
          country: "Poland"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    let form = (
      <form>
        <input
          style={{ display: "block" }}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          style={{ display: "block" }}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          style={{ display: "block" }}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          style={{ display: "block" }}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div
        style={{
          margin: "20px auto",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 2px 3px #ccc"
        }}
      >
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
