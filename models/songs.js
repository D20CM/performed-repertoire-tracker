import songlist from "../database/songs-data.js";
import query from "../database/index.js";

export async function getAllSongs() {
  let allSongs = await query(
    "SELECT id, title, artist, TO_CHAR(lastperformed,'mm/dd/yyyy') As lastperformed FROM songlist ORDER BY id;"
  );
  console.log(allSongs.rows);
  return allSongs.rows;

  // let allSongs = songlist;
  // console.log(allSongs);
  // return allSongs;
}

export async function getSongByID(id) {
  let selectedSong = await query("SELECT * FROM songlist WHERE id = $1;", [id]);
  return selectedSong.rows;
  // let selectedSong = songlist.find(function (song) {
  //   return song.id === id;
  // });
  // console.log(selectedSong);
  // return selectedSong;
}

export async function addSong(newSong) {
  let createdSong = await query(
    "INSERT INTO songlist (title, artist, lastperformed) VALUES ($1,$2,$3) RETURNING title;",
    [newSong.title, newSong.artist, newSong.lastperformed]
  );
  return createdSong.rows;

  // songlist.push(newSong);
  // console.log(newSong);
  // return newSong;
}

export async function updateSong(id, update) {
  console.log(update);
  let songToBeUpdated = await query(
    "UPDATE songlist SET title =$1, artist = $2, lastperformed = $3 WHERE id = ($4) ;",
    [update.title, update.artist, update.lastperformed, id]
  );
  console.log(songToBeUpdated.rows);
  return songToBeUpdated.rows;

  // let index = songlist.findIndex(function (song) {
  //   return song.id === id;
  // });
  // songlist[index] = update;
  // return songlist[index];
}

export async function updateLastPlayed(id, date) {
  // console.log("checking date format: " + JSON.stringify(date));
  console.log(date.lastperformed);
  let songToBeUpdated = await query(
    "UPDATE songlist SET lastperformed = ($2) WHERE id = ($1) ;",
    [id, date.lastperformed]
  );
  return songToBeUpdated.rows;

  // let index = songlist.findIndex(function (song) {
  //   return song.id === id;
  // });
  // console.log("here");
  // console.log(index, id);
  // console.log(songlist[index]);
  // songlist[index].lastperformed = date.lastperformed.lastperformed;
  // return songlist[index];
}
