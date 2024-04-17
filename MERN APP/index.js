const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Utility function to get or create model
function getOrCreateModel(modelName, schema, collectionName) {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  } else {
    return mongoose.model(modelName, schema, collectionName);
  }
}
//post for uploading json file in specific collection name
app.post("/upload-json/:collectionName", async (req, res) => {
  const { collectionName } = req.params;
  const data = req.body;
  const DataSchema = new mongoose.Schema({
    ts: { type: Date, required: true },
    machine_status: { type: Number, required: true },
    vibration: { type: Number, required: true },
  });

  const DynamicModel = getOrCreateModel(
    collectionName,
    DataSchema,
    collectionName
  );
  const processedData = data.map((item) => ({
    ...item,
    ts: new Date(item.ts),
  }));

  try {
    await DynamicModel.insertMany(processedData);
    res
      .status(201)
      .send(`Data successfully uploaded to collection: ${collectionName}`);
  } catch (error) {
    console.error("Error during data upload:", error);
    res.status(500).send("Failed to upload data: " + error.message);
  }
});

app.get("/data-search/:collectionName", async (req, res) => {
  const { collectionName } = req.params;
  const { start, end, timescale } = req.query;

  // Implement logic to filter data based on start, end, and timescale

  try {
    // Fetch data based on the provided parameters
    // Return filtered data
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data: " + error.message });
  }
});


// get for getting unique date from collection
app.get("/dates-from-collection/:collectionName", async (req, res) => {
  const { collectionName } = req.params;
  const DateSchema = new mongoose.Schema({ ts: Date }, { strict: false });
  const DynamicModel = getOrCreateModel(
    collectionName,
    DateSchema,
    collectionName
  );

  try {
    const dates = await DynamicModel.aggregate([
      { $match: { ts: { $exists: true } } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$ts" } },
        },
      },
      { $group: { _id: "$date" } },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(dates.map((d) => d._id));
  } catch (error) {
    console.error("Error fetching dates:", error);
    res.status(500).json({
      message:
        `Failed to fetch dates from collection ${collectionName}: ` +
        error.message,
    });
  }
});


// get to list all collections
app.get("/list-collections", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((collection) => collection.name);
    res.status(200).json(collectionNames);
  } catch (error) {
    console.error("Error listing collections:", error);
    res
      .status(500)
      .json({ message: "Failed to list collections: " + error.message });
  }
});

//get to get data from collection
app.get("/data-from-collection/:collectionName", async (req, res) => {
  const { collectionName } = req.params;
  const DataSchema = new mongoose.Schema(
    {
      ts: Date,
      machine_status: Number,
      vibration: Number,
    },
    { strict: false }
  );
  const DynamicModel = getOrCreateModel(
    collectionName,
    DataSchema,
    collectionName
  );

  try {
    const data = await DynamicModel.find().sort({ ts: 1 }).exec();
    const formattedData = data.map((item) => ({
      ...item._doc,
      ts: item.ts.toISOString(),
    }));

    if (data.length > 0) {
      res.status(200).json({
        startTime: data[0].ts.toISOString(),
        endTime: data[data.length - 1].ts.toISOString(),
        data: formattedData,
      });
    } else {
      res.status(404).json({ message: "No data found in collection." });
    }
  } catch (error) {
    console.error("Error fetching data from collection:", error);
    res.status(500).json({
      message:
        `Failed to fetch data from collection ${collectionName}: ` +
        error.message,
    });
  }
});

function generateSummary(data) {
  let lastStatus = null;
  let count1s = 0;
  let count0s = 0;
  let currentSequence = 0;
  let sequences = { '1': [], '0': [] };

  data.forEach(item => {
      if (item.machine_status === 1) {
          count1s++;
          if (lastStatus === 1) {
              currentSequence++;
          } else {
              if (currentSequence > 0 && lastStatus !== null) {
                  sequences[lastStatus].push(currentSequence);
              }
              currentSequence = 1;
              lastStatus = 1;
          }
      } else if (item.machine_status === 0) {
          count0s++;
          if (lastStatus === 0) {
              currentSequence++;
          } else {
              if (currentSequence > 0 && lastStatus !== null) {
                  sequences[lastStatus].push(currentSequence);
              }
              currentSequence = 1;
              lastStatus = 0;
          }
      }
  });

  // To account for the last sequence in the data
  if (currentSequence > 0 && lastStatus !== null) {
      sequences[lastStatus].push(currentSequence);
  }

  return {
      count1s,
      count0s,
      sequences
  };
}

//get to form a summary for selected collection
app.get("/summary/:collectionName", async (req, res) => {
  const { collectionName } = req.params;
  const DynamicModel = getOrCreateModel(
    collectionName,
    new mongoose.Schema({
      ts: Date,
      machine_status: Number,
      vibration: Number
    }, { strict: false }),
    collectionName
  );

  try {
    const data = await DynamicModel.find({}).sort({ ts: 1 });
    const summary = generateSummary(data);
    res.status(200).json(summary);
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({
      message: `Failed to generate summary for collection ${collectionName}: ` + error.message,
    });
  }
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
