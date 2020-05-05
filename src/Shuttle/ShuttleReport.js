import React from "react";
import { Table, Button } from "reactstrap";

const statusText = {
  1: "Created",
  2: "Cancelled",
  3: "Cancelled - No Show",
  4: "Arrived at Pickup",
  5: "Complete",
  6: "Passenger In Transit",
};

const ShuttleReport = (props) => {
  let output = <div>No Active Bookings</div>;
  console.log(props);

  if (props.bookings) {
    const tableData = props.bookings.map((tripData) =>
      getTableData(tripData, props.onCancelShuttle)
    );
    output = (
      <Table bordered={true} style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Scheduled Time</th>
            <th>
              Estimated
              <br /> Arrival Time
            </th>
            <th>Pick Up</th>
            <th>Destination</th>
            <th>Passengers</th>
            <th>Space Type</th>
            <th>Trip Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
    );
  }

  const debugInfo = (
    <div style={{ display: "flex", padding: "10px" }}>
      <div>{props.pickBuilding}</div>
      <div>{props.dropBuilding}</div>
      <div>{props.spaceType}</div>
      <div>{props.passengers}</div>
    </div>
  );

  return (
    <div className={"table-section"}>
      {/* debugInfo */}
      {output}
    </div>
  );
};

const getTableData = (trip, onCancelShuttle) => {
  return (
    <tr key={trip.confirmationNumber}>
      <td>{trip.vehicle.name}</td>
      <td>{trip.scheduledTime}</td>
      <td>{trip.estimatedArrivalTime}</td>
      <td>{trip.pickupLocation.name}</td>
      <td>{trip.dropoffLocation.name}</td>
      <td>{trip.numberOfRiders}</td>
      <td>{trip.spaceType.name}</td>
      <td>{statusText[trip.status]}</td>
      <td>
        <Button
          size={"sm"}
          onClick={() => {
            onCancelShuttle(trip.confirmationNumber);
          }}
          color={"dark"}
          disabled={trip.status !== 1 && trip.status !== 4}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default ShuttleReport;
