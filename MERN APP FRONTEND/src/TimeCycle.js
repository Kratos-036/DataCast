import React, { useState } from "react";
import "./TimeCycle.css";

const TimeCycle = ({
  data,
  startTime,
  endTime,
  timescale,
  onTimestampSelect,
}) => {
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);

  const allTimestamps = [];
  let currentTime = startTime;
  let timeIncrementMs;
  if (timescale === "seconds") {
    timeIncrementMs = 1000; // 1 second
  } else if (timescale === "minutes") {
    timeIncrementMs = 60 * 1000; // 1 minute
  } else if (timescale === "hours") {
    timeIncrementMs = 60 * 60 * 1000; // 1 hour
  }

  while (currentTime <= endTime) {
    allTimestamps.push(currentTime);
    currentTime = new Date(
      new Date(currentTime).getTime() + timeIncrementMs
    ).toISOString();
  }

  const handleClick = (ts) => {
    setSelectedTimestamp(ts);
    onTimestampSelect(ts); // Pass the selected timestamp up to the parent component
  };

  const renderStatusBlocks = () => {
    return allTimestamps.map((ts, index) => {
      const isPresent = data.some((item) => item.ts === ts);
      const sample = data.find((item) => item.ts === ts);
      const color = isPresent
        ? sample.machine_status === 1
          ? "green"
          : "yellow"
        : "red";

      // Calculate the width of the timestamp block based on the timescale
      let blockWidth;
      if (timescale === "seconds") {
        blockWidth = "2px";
      } else if (timescale === "minutes") {
        blockWidth = "20px";
      } else if (timescale === "hours") {
        blockWidth = "100px";
      }

      return (
        <div
          key={index}
          className={`status-block ${color}`}
          onClick={() => handleClick(ts)}
          style={{ width: blockWidth }}
        >
          {selectedTimestamp === ts && (
            <span className="timestamp-display">{ts}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="cycle-status">
      <div className="status-timeline">{renderStatusBlocks()}</div>
    </div>
  );
};

export default TimeCycle;
