import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import TimeCycle from "./TimeCycle";

const Home = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);
  const [timescale, setTimescale] = useState("seconds");
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/list-collections")
      .then((response) => response.json())
      .then((collections) => {
        setCollections(collections);
        setSelectedCollection(collections[0] || "");
      })
      .catch((error) => console.error("Error fetching collections:", error));
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      setLoading(true);
      fetch(`http://localhost:5001/dates-from-collection/${selectedCollection}`)
        .then((response) => response.json())
        .then((dates) => {
          setDates(dates);
          setSelectedDate(dates[0] || "");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching dates:", error);
          setLoading(false);
        });
    }
  }, [selectedCollection]);

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
      fetch(
        `http://localhost:5001/data-from-collection/${selectedCollection}?date=${selectedDate}&timescale=seconds`
      )
        .then((response) => response.json())
        .then((result) => {
          setStartTime(result.startTime);
          setEndTime(result.endTime);
        })
        .catch((error) => {
          console.error("Error fetching data for default time scale:", error);
        });
    }
  }, [selectedDate, selectedCollection]);

  const fetchData = (date) => {
    if (!selectedCollection || !date) return;

    setLoading(true);
    fetch(
      `http://localhost:5001/data-from-collection/${selectedCollection}?date=${date}&timescale=${timescale}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const fetchSummary = () => {
    if (!selectedCollection) return;

    setLoading(true);
    fetch(`http://localhost:5001/summary/${selectedCollection}`)
      .then((response) => response.json())
      .then((summaryData) => {
        setSummary(summaryData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
        setLoading(false);
      });
  };

  const handleStartTimestampChange = (event) => {
    setStartTimestamp(event.target.value);
  };

  const handleEndTimestampChange = (event) => {
    setEndTimestamp(event.target.value);
  };

  const handleSearch = () => {
    if (!startTimestamp || !endTimestamp) {
      console.error("Please provide both start and end timestamps.");
      return;
    }

    setStartTime(startTimestamp);
    setEndTime(endTimestamp);
    fetchData(selectedDate);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Select a Collection
      </Typography>
      {loading && <CircularProgress />}
      <Box sx={{ marginBottom: 2, position: "relative", zIndex: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="collection-selector-label">Collection</InputLabel>
          <Select
            labelId="collection-selector-label"
            value={selectedCollection}
            label="Collection"
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            {collections.map((collection) => (
              <MenuItem key={collection} value={collection}>
                {collection}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={fetchSummary}
          disabled={!selectedCollection || loading}
          sx={{ marginTop: 2 }}
        >
          Get Summary
        </Button>
      </Box>
      {dates.length > 0 && (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="date-selector-label">Date</InputLabel>
          <Select
            labelId="date-selector-label"
            value={selectedDate}
            label="Date"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="timescale-selector-label">Timescale</InputLabel>
        <Select
          labelId="timescale-selector-label"
          value={timescale}
          label="Timescale"
          onChange={(e) => setTimescale(e.target.value)}
        >
          <MenuItem value="seconds">Seconds</MenuItem>
          <MenuItem value="minutes">Minutes</MenuItem>
          <MenuItem value="hours">Hours</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Start Timestamp"
            value={startTimestamp}
            onChange={handleStartTimestampChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="End Timestamp"
            value={endTimestamp}
            onChange={handleEndTimestampChange}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ marginBottom: 2 }}
      >
        Search
      </Button>

      <Typography variant="h6" gutterBottom>
        Click on Timescale to get Timestamp
      </Typography>
      {data.length > 0 && startTime && endTime && (
        <TimeCycle
          data={data}
          startTime={startTime}
          endTime={endTime}
          timescale={timescale}
          onTimestampSelect={setSelectedTimestamp}
        />
      )}
      {selectedTimestamp && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
          <Typography variant="subtitle1">Selected Timestamp:</Typography>
          <Typography>{selectedTimestamp}</Typography>
        </Box>
      )}
      {summary && (
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ color: "#333", marginBottom: 1 }}>
            Summary for {selectedCollection}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={{ color: "#333" }}>Number of 1s:</Typography>
              <Typography sx={{ color: "#555" }}>{summary.count1s}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "#333" }}>Number of 0s:</Typography>
              <Typography sx={{ color: "#555" }}>{summary.count0s}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "#333" }}>Sequences of 1s:</Typography>
              <Typography sx={{ color: "#555" }}>
                {summary.sequences["1"].join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "#333" }}>Sequences of 0s:</Typography>
              <Typography sx={{ color: "#555" }}>
                {summary.sequences["0"].join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Home;
