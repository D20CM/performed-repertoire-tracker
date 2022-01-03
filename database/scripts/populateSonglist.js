import query from "../index.js";
import songlist from "../songs-data.js";

async function populateSonglist() {
  for (let i = 0; i < songlist.length; i++) {
    const title = songlist[i].title;
    const artist = songlist[i].artist;
    const lastperformed = songlist[i].lastperformed;

    const res = await query(
      `INSERT INTO songlist (title, artist, lastperformed) VALUES ($1, $2, $3)`,
      [title, artist, lastperformed]
    );
    console.log(res);
  }
}
populateSonglist();
