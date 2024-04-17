

# DATACAST : Data Management System

## Description

This project is a robust data management system developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It focuses on the analysis of timestamped sample data, providing features such as data visualization, API filtering based on time scales, and integration with third-party APIs for location-based temperature data.

## Features

- **Data Visualization**: Visualize data points on a horizontal timeline where samples are color-coded: yellow (0), green (1), and red (missing).
- **API Filtering**: Filter data records from the database on various time scales (seconds , minutes and hours )with specified starting times.
- **Third-Party API Integration**: Retrieve and utilize temperature data based on location.
- **Data Summary Generation**: Generate and display summaries in tabular format showing counts and continuous variations of samples.
- **Simulation Tool**: Includes a sample generation simulator to mimic data entry for testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/DataCast.git
cd DataCast
```

### Setup Backend

1. Navigate to the backend directory:

   ```bash
   cd MERN APP
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory and add the following environment variables:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/your-database
   PORT=5001
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Setup Frontend

1. Navigate to the frontend directory from the project root:

   ```bash
   cd ../MERN APP FRONTEND
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

This will launch the frontend on `http://localhost:3000`.

## Usage

- **Accessing the Visualization**: Once both servers are running, navigate to `http://localhost:3000` to view the data visualizations.
- **Viewing Summaries**: Access summaries of data through a dedicated summary page or endpoint.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
