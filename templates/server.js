const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve HTML page
app.use(express.static(__dirname + "/public"));

// Read data from the CSV file
const csvFilePath = path.join(__dirname, "../ecg.csv");
let ecgData = [];

try {
  const csvContent = fs.readFileSync(csvFilePath, "utf8");
  ecgData = csvContent
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number)); // Parse CSV into an array of numbers

  console.log("✅ ECG data loaded from CSV file.");
} catch (error) {
  console.error("⚠️ Failed to load ECG data from CSV file:", error.message);
  process.exit(1); // Exit if the CSV file cannot be loaded
}

// Emit ECG data to the client
let index = 0;
setInterval(() => {
  if (index < ecgData.length) {
    const rowData = ecgData[index];
    let arrythmic = rowData[rowData.length - 1]; // Last column is arrithmic data
    if (arrythmic > 0) {
      console.log(`⚠️ Arrithmic data detected: ${arrythmic}`);
    }
    io.emit("arduinoData", [rowData,arrythmic]); // Emit one row of ECG data
    console.log(`ECG data sent: ${rowData[rowData.length - 1]}`); 
    index++;
  } else {
    index = 0; // Restart from the beginning
  }
}, 200); // Send data every 1 second

server.listen(4000, () => {
  console.log("🌐 Server running at http://localhost:4000");
});
