let songs = JSON.parse(localStorage.getItem("songs")) || [];
let currentIndex = 0;

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const songList = document.getElementById("songList");

function loadSongs() {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.onclick = () => playSong(index);
    songList.appendChild(li);
  });

  if (songs.length > 0) playSong(0);
}

function playSong(index) {
  currentIndex = index;
  audio.src = songs[index].audio;
  cover.src = songs[index].cover;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  audio.play();
}

function playPause() {
  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

loadSongs();
