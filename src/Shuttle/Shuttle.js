import React, { Component } from "react";
import ShuttleForm from "./ShuttleForm";
import ShuttleReport from "./ShuttleReport";
import NavbarTop from "./NavbarTop";
import { Button, Container } from "reactstrap";
import DataAccess from "./DataAccess";
import {
  msalApp,
  LOGIN_SCOPES,
  acquireToken,
  fetchAPI,
  API_SCOPES,
} from "../auth-utils";

class Shuttle extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: false,
      bookings: null,
      buildings: null,
      buildingsHash: {},
      dropBuildingId: -1,
      pickBuildingId: -1,
      passengers: 1,
      spaceType: "AM",
      bookShuttleButtonDisabled: false,
      errors: [],
    };
  }

  componentDidMount() {
    this.loadData().then(
      (formData) => {
        const buildingsHash = createBuildingsHash(formData.buildings);
        this.setState({
          bookings: formData.bookings,
          buildings: formData.buildings,
          buildingsHash,
        });
      },
      (err) => {
        console.log(err);
        console.log("error loading data");
      }
    );
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

    return { bookings, buildings };
  };

  onChangeBuilding = (e) => {
    e.preventDefault();
    console.log("e.target.name = ");
    console.log(e.target.className);

    let buildingId = e.target.value;
    if (e.target.className.indexOf("pickup") >= 0) {
      this.setState({ pickBuildingId: buildingId });
    } else {
      this.setState({ dropBuildingId: buildingId });
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
    // disable book button
    this.setState({ bookShuttleButtonDisabled: true });
    const {
      pickBuildingId,
      dropBuildingId,
      passengers,
      spaceType,
    } = this.state;
    const errors = this.validateBookingParams(
      pickBuildingId,
      dropBuildingId,
      spaceType,
      passengers
    );
    if (errors.length) {
      this.setState({
        errors,
        bookShuttleButtonDisabled: false,
      });
    } else {
      // let buildingId = encodeURIComponent(e.target.value);
      let b1 = this.state.buildingsHash[pickBuildingId];
      let b2 = this.state.buildingsHash[dropBuildingId];
      DataAccess.bookShuttleAsync(
        encodeURIComponent(b1),
        encodeURIComponent(b2),
        passengers,
        spaceType
      )
        .then((response) => {
          console.log(response);

          DataAccess.getLiveBookingsAsync().then((bookings) => {
            this.setState({
              errors,
              bookings,
              pickBuildingId: -1,
              dropBuildingId: -1,
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

  onSignIn = (e) => {
    //alert("Sign In");
    //this.setState({ authenticated: true });
    //const allScopes = [...LOGIN_SCOPES, ...API_SCOPES];
    msalApp.loginPopup([...API_SCOPES]).then((loginResponse) => {
      // console.log("Login Response = ", loginResponse);
      const API_ENDPOINT = `https://apis.msshuttleservices.com/api/Location/GetBuildingsList`;
      // const API_ENDPOINT = `https://apis.msshuttleservices.com/ShuttlePortal/api/MvApi/liveTrips/ALL`;
      acquireToken().then((tokenResponse) => {
        console.log("tokenResponse", tokenResponse.accessToken);
        const apiResponse = fetchAPI(API_ENDPOINT, tokenResponse.accessToken);
        apiResponse
          .then((result) => {
            const statusCode = result.status;
            console.log(statusCode);
            if (statusCode === 200) {
              this.setState({ authenticated: true });
            } else {
              this.setState({ authenticated: false });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };

  testAPI = () => {};

  validateBookingParams(from, to, spaceType, passengers) {
    const errors = [];

    let err = {
      message: "",
      field: "",
    };

    if (!from || from === -1) {
      errors.push({ message: "Select a pickup building" });
    }

    if (!to || to === -1) {
      errors.push({ message: "Select a dropoff building" });
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

    const testApiButton = this.state.authenticated && <Button>Test API</Button>;

    return (
      <>
        <NavbarTop
          onSignIn={this.onSignIn}
          authenticated={this.state.authenticated}
        />
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
            {testApiButton}
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

const createBuildingsHash = (buildings) => {
  const hash = {};
  buildings.forEach((b) => {
    hash[b.id] = b.name;
  });
  return hash;
};
export default Shuttle;
