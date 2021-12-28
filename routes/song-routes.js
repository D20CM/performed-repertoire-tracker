import express from "express";
import { getAllSongs, getSongByID } from "../models/songs.js";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/songs", async function (req, res) {
  let allSongs = await getAllSongs();
  res.json(allSongs);
});

router.get("/songs/:id", async function (req, res) {
  let id = Number(req.params.id);
  let selectedSong = await getSongByID(id);
  res.json(selectedSong);
});

export default router;
