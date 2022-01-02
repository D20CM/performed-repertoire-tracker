import songlist from "../database/songs-data.js";

export async function getAllSongs() {
  let allSongs = songlist;
  console.log(allSongs);
  return allSongs;
}

export async function getSongByID(id) {
  let selectedSong = songlist.find(function (song) {
    return song.id === id;
  });
  console.log(selectedSong);
  return selectedSong;
}

export async function addSong(newSong) {
  songlist.push(newSong);
  console.log(newSong);
  return newSong;
}

export async function updateSong(id, update) {
  let index = songlist.findIndex(function (song) {
    return song.id === id;
  });
  songlist[index] = update;
  return songlist[index];
}

export async function updateLastPlayed(id, date) {
  let index = songlist.findIndex(function (song) {
    return song.id === id;
  });
  console.log("here");
  console.log(index, id);
  console.log(songlist[index]);
  songlist[index].lastPerformed = date.lastPerformed.lastPerformed;
  return songlist[index];
}
