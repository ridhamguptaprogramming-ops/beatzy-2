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
const songs = JSON.parse(localStorage.getItem("songs")) || [];
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