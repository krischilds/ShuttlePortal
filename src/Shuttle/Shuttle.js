import React, { Component } from "react";
import ShuttleForm from "./ShuttleForm";
import ShuttleReport from "./ShuttleReport";
import NavbarTop from "./NavbarTop";
import { Container } from "reactstrap";
import DataAccess from "./DataAccess";

class Shuttle extends Component {
  state = {
    bookings: null,
    buildings: null,
    resetForm: false,
    dropBuilding: -1,
    pickBuilding: -1,
    passengers: -1,
    spaceType: -1,
    bookShuttleButtonDisabled: false,
    errors: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadBuildings = () => {
    DataAccess.getBuildingsAsync().then((buildings) => {
      this.setState({ buildings });
    });
  };

  loadBookings = () => {
    DataAccess.getLiveBookingsAsync().then((bookings) => {
      this.setState({ bookings });
    });
  };

  loadData = async () => {
    let [buildings, bookings] = await Promise.all([
      DataAccess.getBuildingsAsync(),
      DataAccess.getLiveBookingsAsync(),
    ]);
    this.setState({ bookings, buildings });
  };

  onChangeBuilding = (e) => {
    e.preventDefault();
    console.log("e.target.name = ");
    console.log(e.target.className);
    if (e.target.className.indexOf("pickup") >= 0) {
      this.setState({ pickBuilding: e.target.value });
    } else {
      this.setState({ dropBuilding: e.target.value });
    }
  };

  onChangeSpaceType = (e) => {
    console.log("spaceType = " + e.target.value);
    this.setState({ spaceType: e.target.value });
  };

  onChangePassengers = (e) => {
    console.log("passengers = " + e.target.value);
    this.setState({ passengers: e.target.value });
  };

  onCancelShuttle = async (confirmationNumber) => {
    DataAccess.cancelShuttleAsync(confirmationNumber)
      .then((response) => {
        console.log(response);

        DataAccess.getLiveBookingsAsync().then((bookings) => {
          this.setState({
            bookings,
          });
        });
      })
      .catch((err) => {
        const errors = [];
        errors.push({
          message: "Error cancelling shuttle.",
        });
        this.setState({ errors });
      });
  };

  onBookShuttle = async (e) => {
    e.preventDefault();
    // disbable book button
    this.setState({ bookShuttleButtonDisabled: true });
    const { pickBuilding, dropBuilding, passengers, spaceType } = this.state;
    const errors = this.validateBookingParams(
      pickBuilding,
      dropBuilding,
      spaceType,
      passengers
    );
    if (errors.length) {
      this.setState({
        errors,
        bookShuttleButtonDisabled: false,
      });
    } else {
      DataAccess.bookShuttleAsync(
        pickBuilding,
        dropBuilding,
        passengers,
        spaceType
      )
        .then((response) => {
          console.log(response);

          DataAccess.getLiveBookingsAsync().then((bookings) => {
            this.setState({
              errors,
              bookings,
              pickBuilding: -1,
              dropBuilding: -1,
              spaceType: -1,
              passengers: -1,
              bookShuttleButtonDisabled: false, // enable button
            });
          });
        })
        .catch((err) => {
          const errors = [];
          errors.push({
            message:
              "Error booking shuttle. Please refresh the browser and try again.",
          });
          this.setState({ errors, bookShuttleButtonDisabled: false });
        });
    }
  };

  validateBookingParams(from, to, spaceType, passengers) {
    const errors = [];

    let err = {
      message: "",
      field: "",
    };

    if (!from || from === "-1" || from === -1) {
      errors.push({ message: "Select a pickup building" });
    }

    if (!to || to === "-1" || to === -1) {
      errors.push({ message: "Select a dropoff building" });
    }

    if (!spaceType || spaceType === "-1" || spaceType === -1) {
      errors.push({ message: "Select a space type" });
    }

    if (!passengers || passengers === "-1" || passengers === -1) {
      errors.push({ message: "Select number of passengers" });
    }

    return errors;
  }

  render() {
    const errors = this.state.errors.map((err, i) => {
      return (
        <li key={i} className={"text text-danger"}>
          {err.message}
        </li>
      );
    });

    return (
      <>
        <NavbarTop />
        <Container>
          <div style={{ display: "flex" }}>
            <div>
              <ShuttleForm
                userRole={"TODO Guest User"}
                onChangeBuilding={this.onChangeBuilding}
                onBookShuttle={this.onBookShuttle}
                onChangeSpaceType={this.onChangeSpaceType}
                onChangePassengers={this.onChangePassengers}
                {...this.state}
              />
              <ul>{errors}</ul>
            </div>
            <ShuttleReport
              onCancelShuttle={this.onCancelShuttle}
              {...this.state}
            />
          </div>
        </Container>
      </>
    );
  }
}

export default Shuttle;
