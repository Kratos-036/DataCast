// src/components/DataGenerator.js
import React, { useState } from "react";
import generateData from "./utils/DataSimulator";
import randomDate from "./utils/randomDate";
import styles from "./DataGenerator.module.css"; 

const DataGenerator = () => {
  const [data, setData] = useState([]);

  const handleGenerate = () => {
    const startDate = randomDate(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      new Date()
    );
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const generatedData = generateData(
      startDate.toISOString(),
      endDate.toISOString()
    );
    setData(generatedData);
  };

  const downloadJson = () => {
    const fileName = "generatedData.json";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleGenerate}>
          Generate Data
        </button>
        <button
          className={styles.button}
          onClick={downloadJson}
          disabled={!data.length}
        >
          Download JSON
        </button>
      </div>
      <div className={styles.dataPreview}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DataGenerator;
