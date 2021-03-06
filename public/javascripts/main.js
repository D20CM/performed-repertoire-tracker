// import songlist from "../../database/songs-data.js";
// import { port } from "../../bin/www.js";

const url = `http://localhost:3000`;

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

function displayDay(day) {
  day = day.toString();
  while (day.length < 2) {
    day = "0" + day;
  }
  return day;
}

function displayMonth(month) {
  month = (month + 1).toString();
  while (month.length < 2) {
    month = "0" + month;
  }
  return month;
}

async function showAllSongs() {
  console.log("trying");
  let response = await fetch(`/songs`);
  allSongs = await response.json();

  songsDisplayArea.innerHTML = "";

  allSongs.forEach(function (item) {
    let uniqueSong = document.createElement("div");
    let performedDate = new Date(Date.parse(item.lastperformed));

    let niceDate =
      displayDay(performedDate.getDate()) +
      "/" +
      displayMonth(performedDate.getMonth()) +
      "/" +
      performedDate.getFullYear();

    uniqueSong.classList.add("song");
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${niceDate} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastperformed: today });
    });

    if (Date.parse(item.lastperformed) < referenceDate) {
      uniqueSong.style.color = "#6beb34";
    } else if (Date.parse(item.lastperformed) > referenceDate) {
      uniqueSong.style.color = "#ff5454";
    }
  });
}

async function markAsPlayed(id, date) {
  console.log("about to update date");
  let response = await fetch(`/songs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(date),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let updatedSong = await response.json();
  console.log("Song updated to reflect today's performance. ", updatedSong);
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
    let performedDate = new Date(Date.parse(item.lastperformed));

    let niceDate =
      displayDay(performedDate.getDate()) +
      "/" +
      displayMonth(performedDate.getMonth()) +
      "/" +
      performedDate.getFullYear();
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${niceDate} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.style.color = "#6beb34";
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
    let performedDate = new Date(Date.parse(item.lastperformed));

    let niceDate =
      displayDay(performedDate.getDate()) +
      "/" +
      displayMonth(performedDate.getMonth()) +
      "/" +
      performedDate.getFullYear();
    uniqueSong.innerHTML = `<p>${item.id}.</p> <p>${item.title}</p> <p class="date-in-table">${niceDate} </p>`;
    let uniqueButton = document.createElement("button");
    uniqueButton.innerText = "played";
    uniqueButton.classList.add("playedButtons");
    songsDisplayArea.append(uniqueSong);
    uniqueSong.style.color = "#ff5454";
    uniqueSong.append(uniqueButton);
    uniqueButton.id = item.id;
    uniqueButton.addEventListener("click", async function wrapper() {
      await markAsPlayed(uniqueButton.id, { lastperformed: today });
    });
  });
}

playedButton.addEventListener("click", showPlayed);
