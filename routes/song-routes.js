import express from "express";
import {
  getAllSongs,
  getSongByID,
  addSong,
  updateSong,
  updateLastPlayed,
} from "../models/songs.js";

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

router.post("/songs", async function (req, res) {
  let newSong = req.body;
  const addedSong = await addSong(newSong);
  res.json(addedSong);
});

router.put("/songs/:id", async function (req, res) {
  let id = Number(req.params.id);
  let update = req.body;
  let updatedSong = await updateSong(id, update);
  res.json(updatedSong);
});

router.patch("/songs/:id", async function (req, res) {
  let id = Number(req.params.id);
  let update = req.body;
  let updatedSong = await updateLastPlayed(id, update);
  res.json(updatedSong);
});

export default router;
