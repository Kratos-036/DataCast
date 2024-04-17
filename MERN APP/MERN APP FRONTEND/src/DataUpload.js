import React, { useState } from "react";
import styles from "./DataUpload.module.css"; 

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [collectionName, setCollectionName] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !collectionName) return;

    let reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const response = await fetch(
          `http://localhost:5001/upload-json/${collectionName}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
          }
        );

        if (response.ok) {
          alert("Data uploaded successfully");
          setFile(null);
          setCollectionName("");
        } else {
          alert("Failed to upload data: " + (await response.text()));
        }
      } catch (error) {
        alert("Error parsing JSON file: " + error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Data</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="file"
          onChange={handleFileChange}
          accept=".json"
          required
        />
        <button className={styles.button} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default DataUpload;
