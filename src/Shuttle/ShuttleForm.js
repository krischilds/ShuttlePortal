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
      <div
        style={{
          border: "1px solid #c0c0c0",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRadius: "4px",
          margin: "10px",
          minWidth: "320px",
          maxWidth: "400px",
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup>
            <Label for="pickBuilding">Pickup Building</Label>
            <Input
              defaultValue={"-1"}
              className="pickup"
              type="select"
              name="pick"
              id="pickBuilding"
              onChange={this.props.onChangeBuilding}
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
              defaultValue={"-1"}
              className="dropoff"
              type="select"
              name="drop"
              id="dropBuilding"
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
              defaultValue={"-1"}
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
              defaultValue={"-1"}
              onChange={this.props.onChangePassengers}
            >
              <option disabled value="-1">
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

          <Button color={"success"} onClick={this.props.onBookShuttle}>
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

/*
ShuttleForm.propTypes = {
  userRole: PropTypes.string.isRequired,
  onChangeBuilding: PropTypes.func.isRequired,
  onBookShuttle: PropTypes.func.isRequired,
  onChangeAccountName: PropTypes.func.isRequired
};
*/

export default ShuttleForm;
