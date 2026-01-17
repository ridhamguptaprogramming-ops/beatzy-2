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