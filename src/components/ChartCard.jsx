import React from "react";
import "./../styles/chartcard.css";

const ChartCard = ({ title, children, legend }) => {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div>{children}</div>
      {legend && <ul className="legend">{legend}</ul>}
    </div>
  );
};

export default ChartCard;
