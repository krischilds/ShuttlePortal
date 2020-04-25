import React from "react";

export default function ShuttleReport(props) {
  var output = <div>Loading...</div>;
  console.log(props);

  if (props.data) {
    const listItems = props.data.map(app => getAppInfo(app));
    output = <ul style={{ backgroundColor: "#f0f0f0" }}>{listItems}</ul>;
  }

  return output;
}

function getAppInfo(app) {
  return (
    <li key={app.id}>
      <div>
        <a href={app.html_url} target={app.name}>
          {app.name}
        </a>
      </div>
    </li>
  );
}
