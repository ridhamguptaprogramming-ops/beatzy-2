let playing = false;

function toggle(btn){
  playing = !playing;
  btn.textContent = playing ? "⏸" : "▶";
}

document.getElementById("miniPlay").onclick = function(){
  toggle(this);
};

document.getElementById("mainPlay").onclick = function(){
  toggle(this);
};

document.querySelectorAll(".play").forEach(b=>{
  b.onclick = ()=>toggle(b);
});
// const songs = JSON.parse(localStorage.getItem("songs")) || [];
const songList = document.getElementById("songList");

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} by ${song.artist}`;
  songList.appendChild(li);
});

document.getElementById("addSongForm").onsubmit = function(e){
  e.preventDefault();
  const title = this.title.value;
  const artist = this.artist.value;
  const newSong = { title, artist };
  songs.push(newSong);
  localStorage.setItem("songs", JSON.stringify(songs));

  const li = document.createElement("li");
  li.textContent = `${title} by ${artist}`;
  songList.appendChild(li);

  this.reset();
};  
songList.innerHTML = "";

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} by ${song.artist}`;
  songList.appendChild(li);
});
song.plays = (song.plays || 0) + 1;
localStorage.songs = JSON.stringify(songs);
document.getElementById("playCount").textContent = `Plays: ${song.plays}`;

function logout(){
  window.location.href = "index.html";
}
function delayedLogout(){
    alert("Logging out due to inactivity");
}
function playSong(song){
  audio.src = song.src;
  audio.play();
  now.textContent = song.title + " • " + song.artist;

  song.plays = (song.plays || 0) + 1;
  localStorage.songs = JSON.stringify(songs);

  renderPlaylist();
}
function renderPlaylist(){
  const playlist = document.getElementById("playlist");
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} by ${song.artist} - Plays: ${song.plays || 0}`;
    li.onclick = () => playSong(song);
    playlist.appendChild(li);
  });
}
renderPlaylist();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });
const DB = "songs.json";

/* INIT DB */
if (!fs.existsSync(DB)) fs.writeFileSync(DB, "[]");

/* GET SONGS */
app.get("/songs", (req,res)=>{
  res.json(JSON.parse(fs.readFileSync(DB)));
});

/* UPLOAD SONG */
app.post("/upload", upload.fields([
  { name: "song", maxCount: 1 },
  { name: "cover", maxCount: 1 }
]), (req,res)=>{
  const songs = JSON.parse(fs.readFileSync(DB));

  const newSong = {
    title: req.body.title,
    artist: req.body.artist,
    src: `/uploads/${req.files.song[0].filename}`,
    cover: `/uploads/${req.files.cover[0].filename}`,
    plays: 0
  };

  songs.push(newSong);
  fs.writeFileSync(DB, JSON.stringify(songs,null,2));
  res.json({ success:true });
});

app.listen(3000, ()=>console.log("Server running on http://localhost:3000"));
fetch("http://localhost:3000/songs")
  .then(r=>r.json())
  .then(data=>{
    songs = data;
    renderTracks();
  });
function renderTracks(){
  const tbody = document.getElementById("songTableBody");
  tbody.innerHTML = "";
  songs.forEach((song, index)=>{
    tbody.innerHTML += `
      <tr>
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td><img src="${song.cover}" width="50"></td>
        <td>${song.plays}</td>
      </tr>
    `;
  });
}
import { getDocs, collection } from "firebase/firestore";

const snapshot = await getDocs(collection(db,"songs"));
snapshot.forEach(doc=>{
  songs.push(doc.data());
});
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("songs.json")) fs.writeFileSync("songs.json","[]");



app.get("/", (req,res)=>res.send("Music API Running"));

app.get("/songs", (req,res)=>{
  res.json(JSON.parse(fs.readFileSync("songs.json")));
});

app.post("/upload",
  upload.fields([{name:"song"},{name:"cover"}]),
  (req,res)=>{
    const songs = JSON.parse(fs.readFileSync("songs.json"));

    songs.push({
      title: req.body.title,
      artist: req.body.artist,
      src: "/uploads/" + req.files.song[0].filename,
      cover: "/uploads/" + req.files.cover[0].filename,
      plays: 0
    });

    fs.writeFileSync("songs.json", JSON.stringify(songs,null,2));
    res.json({ success:true });
});

const tracksBox = document.querySelector(".tracks");
const audio = document.getElementById("audio");
const coverImg = document.getElementById("coverImg");
const nowPlaying = document.getElementById("nowPlaying");

let songs = [];

/* FETCH SONGS FROM BACKEND */
fetch("/songs")
  .then(res => res.json())
  .then(data => {
    songs = data;
    renderSongs();
  });

function renderSongs() {
  tracksBox.innerHTML = "";

  songs.forEach(song => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${song.title} • ${song.artist}</span>
      <button>▶</button>
    `;

    li.querySelector("button").onclick = () => playSong(song);
    tracksBox.appendChild(li);
  });
}

function playSong(song) {
  audio.src = song.src;
  audio.play();

  nowPlaying.textContent = song.title + " • " + song.artist;
  if (song.cover) coverImg.src = song.cover;
}
