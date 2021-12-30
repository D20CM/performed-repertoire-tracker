// import songlist from "../../database/songs-data.js";
const url = "http://localhost:3000";

let getAllSongsButton = document.getElementById("get-all-songs");
let songsDisplayArea = document.getElementById("songs-display-area");

async function showAllSongs() {
  console.log("trying");
  let response = await fetch(`${url}/songs`);
  let allSongs = await response.json();
  console.log(allSongs);
  songsDisplayArea.innerHTML = "";

  allSongs.forEach(function (item) {
    let uniqueSong = document.createElement("div");
    uniqueSong.innerHTML = `<p>${item.id}. ${item.title}:  ${item.lastPerformed}</p>`;
    songsDisplayArea.append(uniqueSong);
  });
}

getAllSongsButton.addEventListener("click", showAllSongs);
