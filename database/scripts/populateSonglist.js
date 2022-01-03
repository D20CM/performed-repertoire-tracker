import query from "../index.js";
import songlist from "../songs-data.js";

async function populateSonglist() {
  for (let i = 0; i < songlist.length; i++) {
    const title = songlist[i].title;
    const artist = songlist[i].artist;
    const lastPerformed = songlist[i].lastPerformed;

    const res = await query(
      `INSERT INTO songlist (title, artist, lastPerformed) VALUES ($1, $2, $3)`,
      [title, artist, lastPerformed]
    );
    console.log(res);
  }
}
populateSonglist();
