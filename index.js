const express = require("express");

const cors = require("cors");

const videoRoutes = require("./routes/videos"); // Import the videos router

const app = express();

const port = 8000;

app.use(cors());

app.use(express.json());

app.use("/videos", videoRoutes); // Mount the video routes at the /video base path

app.use("/videos/:id", videoRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
