import React, { Component } from "react";
import ShuttleForm from "./ShuttleForm";
import ShuttleReport from "./ShuttleReport";
import NavbarTop from "./NavbarTop";
import { Container } from "reactstrap";

class Shuttle extends Component {
  state = {
    accountName: "",
    buildings: "",
    selectedPickup: "",
    selectedDropoff: "",
    data: null
  };

  componentDidMount() {
    // this.loadReportData();
    // this.getData();
  }

  onChangeAccountName = e => {
    let accountName = e.target.value;
    this.loadData(accountName);
  };

  getDataUrl = user => {
    const dataUrl = `https://api.github.com/users/${user}/repos`;
    return dataUrl;
  };

  loadData = user => {
    if (!user) return;
    const dataUrl = this.getDataUrl(user);
    fetch(dataUrl)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Request failed.");
      })
      .then(data => {
        console.log(user);
        console.log(data);
        this.setState({ data: data, accountName: user });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChangeBuilding = e => {
    e.preventDefault();
    console.log("e.target.name = ");
    console.log(e.target);
  };

  onChangeBuilding = e => {
    e.preventDefault();
    console.log("e.target.name = ");
    console.log(e.target.className);
    if (e.target.className.indexOf("pickup") >= 0) {
      this.setState({ selectedPickup: e.target.value });
    } else {
      this.setState({ selectedDropoff: e.target.value });
    }
  };

  onBookShuttle = e => {
    e.preventDefault();
    // var items = getBuildingOptions();
    // console.log(items);
    if (this.state.selectedPickup && this.state.selectedPickup !== "-1") {
      if (this.state.selectedDropoff && this.state.selectedDropoff !== "-1") {
        this.setState({ selectedPickup: "-1", selectedDropoff: "-1" });
      }
    }
  };

  render() {
    return (
      <Container>
        <NavbarTop />
        <ShuttleForm
          userRole={"Guest User"}
          onChangeBuilding={this.onChangeBuilding}
          onBookShuttle={this.onBookShuttle}
          onChangeAccountName={this.onChangeAccountName}
        />
        <ShuttleReport data={this.state.data} />
      </Container>
    );
  }
}

export default Shuttle;
