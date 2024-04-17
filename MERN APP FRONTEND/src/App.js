import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import TimeCycle from "./TimeCycle";
import TopMenuBar from "./TopMenuBar";
import DataUpload from './DataUpload';


import "./App.css";
import Home from './Home';
import DataGenerator from './DataGenerator';
import Contact from './Contact';

function App() {
  // const cycleData = [
  //   { ts: "2024-01-21T08:53:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T08:54:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T08:55:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T08:56:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T08:57:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T08:58:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T08:59:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:00:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:01:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:02:48Z", machine_status: undefined }, // Missing entry
  //   { ts: "2024-01-21T09:03:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:04:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:05:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:06:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:07:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:08:48Z", machine_status: undefined }, // Missing entry
  //   { ts: "2024-01-21T09:09:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:10:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:11:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:12:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:13:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:14:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:15:48Z", machine_status: 1 },
  //   { ts: "2024-01-21T09:16:48Z", machine_status: undefined }, // Missing entry
  //   { ts: "2024-01-21T09:17:48Z", machine_status: 0 },
  //   { ts: "2024-01-21T09:18:48Z", machine_status: 1 },
  // ];


  const [cycleData, setCycleData] = useState([]);

  useEffect(() => {
    // Function to fetch cycle data from the backend
    const fetchCycleData = async () => {
      try {
        const response = await fetch('http://localhost:5001/cycledata');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCycleData(data);
      } catch (error) {
        console.error("Could not fetch cycle data:", error);
      }
    };

    fetchCycleData();
  }, []);
  return (
    <Router>
      <div className="App">
        <TopMenuBar />
        <Routes> 
          <Route path="/" element={<TimeCycle />} exact />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<DataUpload />} />
          <Route path="/datagenerator" element={<DataGenerator />} />
          <Route path="/contact" element={<Contact />} />


          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
