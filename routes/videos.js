const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const getVideos = () => {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "..", "data", "videos.json"),
    "utf-8"
  );

  return JSON.parse(jsonData);
};

// GET all videos

router.get("/", (req, res) => {
  const videos = getVideos();

  res.json(videos);
});

// GET a video by ID
router.get("/:id", (req, res) => {
  const videos = getVideos();

  const video = videos.find((v) => v.id === req.params.id);

  if (!video) return res.status(404).send("Video not found");

  res.json(video);
});

// POST a new video

router.post("/", (req, res) => {
  const videos = getVideos();
  console.log(req.body);

  const newVideo = {
    id: uuidv4(), // Generate a random UUID

    title: req.body.title || "Choose adventure while Abroad",

    channel: req.body.channel || "Elizabeth Johnson",

    image:
      req.body.image ||
      "https://blog.hdwallsource.com/wp-content/uploads/2016/01/hot-air-balloon-wallpaper-hd-48994-50642-hd-wallpapers.jpg",
  };

  videos.push(newVideo);

  fs.writeFileSync(
    path.join(__dirname, "..", "data", "videos.json"),
    JSON.stringify(videos, null, 2)
  );

  res.status(201).json(newVideo);
});

module.exports = router;
