

const generateData = (startTime, endTime, interval = 1000, skipChance = 0.2) => {
  const data = [];
  let currentTime = new Date(startTime).getTime();
  const endTimeStamp = new Date(endTime).getTime();

  while (currentTime <= endTimeStamp) {
      if (Math.random() > skipChance) {  // Randomly decides whether to skip this timestamp
          data.push({
              ts: new Date(currentTime).toISOString(),
              machine_status: Math.floor(Math.random() * 2), // Randomly 0 or 1
              vibration: parseFloat((Math.random() * 10).toFixed(2)) // Random vibration level between 0 and 10
          });
      }
      currentTime += interval; // Increment by one second
  }

  return data;
};

export default generateData;
