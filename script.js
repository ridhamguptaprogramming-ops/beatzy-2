let songs = JSON.parse(localStorage.getItem("songs")) || [];
let currentIndex = localStorage.getItem("currentIndex")
  ? parseInt(localStorage.getItem("currentIndex"))
  : 0;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const songList = document.getElementById("songList");

/* Load Songs */
function loadSongs() {
  songList.innerHTML = "";

  if (songs.length === 0) {
    title.textContent = "No Songs Found 🎄";
    artist.textContent = "Upload from Admin";
    cover.src = "";
    return;
  }

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.className = "song-item";

    if (index === currentIndex) li.classList.add("active");

    li.onclick = () => playSong(index);
    songList.appendChild(li);
  });

  playSong(currentIndex, false);
}

/* Play Song */
function playSong(index, autoplay = true) {
  if (!songs[index]) return;

  currentIndex = index;
  localStorage.setItem("currentIndex", currentIndex);

  audio.src = songs[index].audio;
  cover.src = songs[index].cover;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;

  document.querySelectorAll(".song-item").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  if (autoplay) audio.play();
}

/* Controls */
function playPause() {
  if (!audio.src) return;
  audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
  if (songs.length === 0) return;
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prevSong() {
  if (songs.length === 0) return;
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

/* Auto Next on End */
audio.addEventListener("ended", nextSong);

/* Init */
loadSongs();
