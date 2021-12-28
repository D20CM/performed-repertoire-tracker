import express from "express";
import { getAllSongs } from "../models/songs.js";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/songs", async function (req, res) {
  let allSongs = await getAllSongs();
  res.json(allSongs);
});

export default router;
