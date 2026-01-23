/* ================= ELEMENTS ================= */
const songContainer = document.getElementById("songContainer");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nowTitle = document.getElementById("nowTitle");
const nowArtist = document.getElementById("nowArtist");
const searchInput = document.getElementById("search");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const playlistSelect = document.getElementById("playlistSelect");

/* ================= DEFAULT SONGS ================= */
if (!localStorage.getItem("songs")) {
  localStorage.setItem(
    "songs",
    JSON.stringify([
      {
        title: "Man on a Mission",
        artist: "Code",
        cover:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        audio:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        title: "In The End",
        artist: "Darcy",
        cover:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
        audio:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
    ])
  );
}

const songs = JSON.parse(localStorage.getItem("songs"));
let currentIndex = -1;

/* ================= PLAYLIST DATA ================= */
let playlists = JSON.parse(localStorage.getItem("playlists")) || {};

/* ================= RENDER SONGS ================= */
function renderSongs(filter = "all") {
  songContainer.innerHTML = "";

  songs.forEach((song, index) => {
    if (filter !== "all" && !playlists[filter]?.includes(index)) return;

    const div = document.createElement("div");
    div.className = "song";
    div.innerHTML = `
      <img src="${song.cover}">
      <div>
        <b>${song.title}</b>
        <small>${song.artist}</small>
      </div>
      <button onclick="playSong(${index})">▶</button>
    `;
    songContainer.appendChild(div);
  });
}

/* ================= LOAD SONG ================= */
function loadSong(index) {
  currentIndex = index;
  const song = songs[index];
  audio.src = song.audio;
  nowTitle.textContent = song.title;
  nowArtist.textContent = song.artist;
}

/* ================= PLAY SONG ================= */
window.playSong = function (index) {
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";

  document.querySelectorAll(".song").forEach((s) =>
    s.classList.remove("active")
  );
  document.querySelectorAll(".song")[index].classList.add("active");
};

/* ================= PLAY / PAUSE ================= */
playBtn.onclick = () => {
  if (!audio.src) return;
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
};

/* ================= SEARCH ================= */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll(".song").forEach((song) => {
    song.style.display = song.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
});

/* ================= SHUFFLE & REPEAT ================= */
let isShuffle = false;
let isRepeat = false;

shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
};

repeatBtn.onclick = () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
};

/* ================= NEXT SONG ================= */
function nextSong() {
  if (currentIndex === -1) return;

  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
    return;
  }

  currentIndex = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : (currentIndex + 1) % songs.length;

  loadSong(currentIndex);
  audio.play();
}

audio.addEventListener("ended", nextSong);

/* ================= PLAYLIST SYSTEM ================= */
function loadPlaylists() {
  playlistSelect.innerHTML = `<option value="all">All Songs</option>`;
  Object.keys(playlists).forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    playlistSelect.appendChild(opt);
  });
}

window.createPlaylist = function () {
  const name = prompt("Playlist name?");
  if (!name) return;
  playlists[name] = [];
  localStorage.setItem("playlists", JSON.stringify(playlists));
  loadPlaylists();
};

playlistSelect.addEventListener("change", () => {
  renderSongs(playlistSelect.value);
});

/* ================= INIT ================= */
loadPlaylists();
renderSongs();

/* ================= PROGRESS BAR ================= */
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

/* UPDATE PROGRESS WHILE PLAYING */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

/* SEEK ON DRAG */
progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* FORMAT TIME */
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

/* RESET WHEN SONG CHANGES */
audio.addEventListener("loadedmetadata", () => {
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = formatTime(audio.duration);
});
