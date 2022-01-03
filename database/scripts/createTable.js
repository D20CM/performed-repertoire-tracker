import query from "../index.js";

async function createSonglist() {
  let res = await query(`CREATE TABLE IF NOT EXISTS songlist (
        id SERIAL PRIMARY KEY,
        title TEXT,
        artist TEXT,
        lastPerformed DATE
        )`);
  console.log("Created songlist: ", res);
}

createSonglist();
