import songlist from "../database/songs-data.js";

export async function getAllSongs() {
  let allSongs = songlist;
  console.log(allSongs);
  return allSongs;
}
