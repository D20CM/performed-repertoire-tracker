// import songlist from "../../database/songs-data.js";
const url = "http://localhost:3000";

let getAllSongsButton = document.getElementById("get-all-songs");
let songsDisplayArea = document.getElementById("songs-display-area");
let playedButtons = document.querySelectorAll(".played-button");
let dateHeader = document.getElementById("date-header");
let dateInput = document.getElementById("date-input");
let dateSubmit = document.getElementById("date-submit");
let unplayedButton = document.getElementById("unplayed-button");
let playedButton = document.getElementById("played-button");

let today = new Date().toLocaleDateString();
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
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${item.lastPerformed} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastPerformed: today });
    });
    console.log(Date.parse(item.lastPerformed));
    if (Date.parse(item.lastPerformed) < referenceDate) {
      uniqueSong.style.color = "#6beb34";
    } else if (Date.parse(item.lastPerformed) > referenceDate) {
      uniqueSong.style.color = "Red";
    }
  });
}

async function markAsPlayed(id, date) {
  console.log("about to update date");
  let response = await fetch(`${url}/songs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      lastPerformed: date,
    }),
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
    return Date.parse(song.lastPerformed) < referenceDate;
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
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${item.lastPerformed} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastPerformed: today });
    });
  });
}

unplayedButton.addEventListener("click", showUnplayed);

async function showPlayed() {
  let unPlayedSongs = allSongs.filter(function (song) {
    return Date.parse(song.lastPerformed) > referenceDate;
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
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${item.lastPerformed} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastPerformed: today });
    });
  });
}

playedButton.addEventListener("click", showPlayed);
