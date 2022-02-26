// import songlist from "../../database/songs-data.js";
// import { port } from "../../bin/www.js";

const url = `http://localhost:80`;

let getAllSongsButton = document.getElementById("get-all-songs");
let songsDisplayArea = document.getElementById("songs-display-area");
let playedButtons = document.querySelectorAll(".played-button");
let dateHeader = document.getElementById("date-header");
let dateInput = document.getElementById("date-input");
let dateSubmit = document.getElementById("date-submit");
let unplayedButton = document.getElementById("unplayed-button");
let playedButton = document.getElementById("played-button");

let today = new Date().toDateString();
dateHeader.innerText = "Today's date: " + today;

dateSubmit.addEventListener("click", handleDateSubmit);
let referenceDate;
let allSongs;

function handleDateSubmit() {
  referenceDate = new Date(dateInput.value);
  console.log("Reference date is: " + referenceDate);
  showAllSongs();
}

async function showAllSongs() {
  console.log("trying");
  let response = await fetch(`${url}/songs`);
  allSongs = await response.json();
  console.log(allSongs);
  songsDisplayArea.innerHTML = "";

  allSongs.forEach(function (item) {
    let uniqueSong = document.createElement("div");
    uniqueSong.classList.add("song");
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${item.lastperformed} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastperformed: today });
    });
    console.log(Date.parse(item.lastperformed));
    if (Date.parse(item.lastperformed) < referenceDate) {
      uniqueSong.style.color = "#6beb34";
    } else if (Date.parse(item.lastperformed) > referenceDate) {
      uniqueSong.style.color = "Red";
    }
  });
}

async function markAsPlayed(id, date) {
  console.log("about to update date");
  let response = await fetch(`${url}/songs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(date),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let updatedSong = await response.json();
  console.log(updatedSong);
  showAllSongs();
}

getAllSongsButton.addEventListener("click", showAllSongs);

async function showUnplayed() {
  let unPlayedSongs = allSongs.filter(function (song) {
    return Date.parse(song.lastperformed) < referenceDate;
  });

  console.log(
    "Here are the unplayed songs: " +
      unPlayedSongs.map(function (song) {
        return song.title;
      })
  );
  songsDisplayArea.innerHTML = "";
  //need to refactor this to a seperate function
  unPlayedSongs.forEach(function (item) {
    let uniqueSong = document.createElement("div");
    uniqueSong.classList.add("song");
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${item.lastperformed} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastperformed: today });
    });
  });
}

unplayedButton.addEventListener("click", showUnplayed);

async function showPlayed() {
  let unPlayedSongs = allSongs.filter(function (song) {
    return Date.parse(song.lastperformed) > referenceDate;
  });

  console.log(
    "Here are the played songs: " +
      unPlayedSongs.map(function (song) {
        return song.title;
      })
  );
  songsDisplayArea.innerHTML = "";
  //need to refactor this to a seperate function
  unPlayedSongs.forEach(function (item) {
    let uniqueSong = document.createElement("div");
    uniqueSong.classList.add("song");
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${item.lastperformed} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastperformed: today });
    });
  });
}

playedButton.addEventListener("click", showPlayed);
