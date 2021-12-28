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
