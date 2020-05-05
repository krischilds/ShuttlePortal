import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

var buildingsOptionsCache = null;

class ShuttleForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    this.passengers = [];

    for (let i = 0; i < 7; i++) {
      this.passengers[i] = i + 1;
    }

    this.spaceTypeValues = [
      { id: "AM", name: "Ambulatory" },
      { id: "WC", name: "Wheelchair" },
      { id: "44", name: "Visually Impaired (44)" },
      { id: "77", name: "Requires Assistance (77)" },
    ];

    this.passengerOptions = passengerRadioButtons(
      this.passengers,
      props.onChangePassengers,
      props.passengers
    );

    this.spaceTypeOptions = createSpaceTypeOptions(
      this.spaceTypeValues,
      props.onChangeSpaceType,
      props.spaceType
    );
  }

  render() {
    const buildingOptions = getBuildingOptions(this.props.buildings);

    return (
      <div className={"form-section"}>
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup>
            <Label for="pickBuilding">Pickup Building</Label>
            <Input
              value={this.props.pickBuildingId}
              className="pickup"
              type="select"
              name="pick"
              id="pickBuilding"
              onChange={this.props.onChangeBuilding}
              bsSize="sm"
            >
              <option disabled value="-1">
                Select Pickup Building
              </option>
              {buildingOptions}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="dropBuilding">Dropoff Building</Label>
            <Input
              value={this.props.dropBuildingId}
              className="dropoff"
              type="select"
              name="drop"
              id="dropBuilding"
              bsSize="sm"
              onChange={this.props.onChangeBuilding}
            >
              <option disabled value="-1">
                Select Dropoff Building
              </option>
              {buildingOptions}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="spaceType2">Space Type</Label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              {this.spaceTypeOptions}
            </div>
          </FormGroup>

          <FormGroup>
            <Label for="passengers">Passengers</Label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {this.passengerOptions}
            </div>
          </FormGroup>

          <Button
            disabled={this.props.bookShuttleButtonDisabled}
            color={"success"}
            size={"sm"}
            onClick={this.props.onBookShuttle}
          >
            Book Shuttle
          </Button>
        </Form>
      </div>
    );
  }
}

const getBuildingOptions = (buildings) => {
  var options = null;
  if (!buildingsOptionsCache) {
    if (buildings && buildings.length) {
      options = buildings.map((b) => {
        return (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        );
      });
    }
    buildingsOptionsCache = options;
  }
  return buildingsOptionsCache;
};

const passengerRadioButtons = (passengers, onChange, selected) => {
  let rbs = passengers.map((p) => {
    return (
      <FormGroup check={true} key={p}>
        <Label check={true}>
          <Input
            onChange={onChange}
            type="radio"
            name="passengers"
            value={p}
            defaultChecked={selected === p}
          />
          {p}{" "}
        </Label>
      </FormGroup>
    );
  });

  return rbs;
};

const createSpaceTypeOptions = (values, onChange, selectedValue) => {
  let rbs = values.map((v) => {
    return (
      <FormGroup check={true} key={v.id}>
        <Label check={true}>
          <Input
            onChange={onChange}
            type="radio"
            name="spaceType"
            value={v.id}
            defaultChecked={selectedValue === v.id}
          />
          {v.name}{" "}
        </Label>
      </FormGroup>
    );
  });

  return rbs;
};

ShuttleForm.propTypes = {
  userRole: PropTypes.string.isRequired,
  onChangeBuilding: PropTypes.func.isRequired,
  onBookShuttle: PropTypes.func.isRequired,
};

export default ShuttleForm;
