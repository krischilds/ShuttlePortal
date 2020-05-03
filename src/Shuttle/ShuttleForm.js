import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

var optionsCache = null;

class ShuttleForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    const buildingOptions = getBuildingOptions(this.props.buildings);
    return (
      <div className={"form-section"}>
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup>
            <Label for="pickBuilding">Pickup Building</Label>
            <Input
              defaultValue={-1}
              value={this.props.pickBuilding}
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
              value={this.props.dropBuilding}
              defaultValue={-1}
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
            <Label for="spaceType">Space Type</Label>
            <Input
              type="select"
              name="spaceType"
              id="spaceType"
              defaultValue={-1}
              bsSize="sm"
              value={this.props.spaceType}
              onChange={this.props.onChangeSpaceType}
            >
              <option disabled value="-1">
                Select Space Type
              </option>
              <option value="AM">Ambulatory</option>
              <option value="WC">Wheelchair</option>
              <option value="44">44</option>
              <option value="77">77</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="passengers">Passengers</Label>
            <Input
              type="select"
              name="passengers"
              id="passengers"
              defaultValue={-1}
              value={this.props.passengers}
              bsSize="sm"
              onChange={this.props.onChangePassengers}
            >
              <option disabled value={-1}>
                Select Number of Passengers
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </Input>
          </FormGroup>

          <Button
            disabled={this.props.bookShuttleButtonDisabled}
            color={"success"}
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
  if (!optionsCache) {
    if (buildings && buildings.length) {
      options = buildings.map((b) => {
        return (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        );
      });
    }
    optionsCache = options;
  }
  return optionsCache;
};

ShuttleForm.propTypes = {
  userRole: PropTypes.string.isRequired,
  onChangeBuilding: PropTypes.func.isRequired,
  onBookShuttle: PropTypes.func.isRequired,
};

export default ShuttleForm;
