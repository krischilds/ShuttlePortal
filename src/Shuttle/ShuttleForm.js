import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const buildings = [
  { value: "16", label: "16" },
  { value: "18", label: "18" },
  { value: "36", label: "36" },
  { value: "40", label: "40" },
  { value: "44", label: "44" },
  { value: "commons", label: "Commons" },
  { value: "rts", label: "Redmond Technology Station" }
];

var optionsCache = null;

const getBuildingOptions = () => {
  var options = null;
  if (!optionsCache) {
    options = buildings.map(b => {
      return (
        <option key={b.value} value={b.value}>
          {b.label}
        </option>
      );
    });

    optionsCache = options;
  }
  return optionsCache;
};

class ShuttleForm extends Component {
  render() {
    const buildingOptions = getBuildingOptions();
    return (
      <Form
        style={{
          border: "1px solid #a0a0a0",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          margin: "10px"
        }}
        onSubmit={this.props.onBookShuttle}
      >
        <FormGroup>
          <Label for="exampleSelect">Pickup Building</Label>
          <Input type="select" name="pick" id="pickSelect">
            {buildingOptions}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Dropoff Building</Label>
          <Input type="select" name="drop" id="dropSelect">
            {buildingOptions}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="spaceTypeId">Space Type</Label>
          <Input type="select" name="spaceType" id="spaceTypeId">
            <option value="AM">Ambulaatory</option>
            <option value="WC">Wheelchair</option>
            <option value="44">44</option>
            <option value="77">77</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Passengers</Label>
          <Input type="select" name="passengers" id="passengersSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }
}

/*
ShuttleForm.propTypes = {
  userRole: PropTypes.string.isRequired,
  onChangeBuilding: PropTypes.func.isRequired,
  onBookShuttle: PropTypes.func.isRequired,
  onChangeAccountName: PropTypes.func.isRequired
};
*/

export default ShuttleForm;
