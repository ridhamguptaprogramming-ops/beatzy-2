const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nowTitle = document.getElementById("nowTitle");
const nowArtist = document.getElementById("nowArtist");

JSON.parse(localStorage.getItem("songs"))

/* DEFAULT SONGS (only first time) */
if (!localStorage.getItem("songs")) {
  localStorage.setItem("songs", JSON.stringify([
    {
      title:"Man on a Mission",
      artist:"Code",
      cover:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title:"In The End",
      artist:"Darcy",
      cover:"https://images.unsplash.com/photo-1527980965255-d3b416303d12",
      audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
  ]));
}

const songs = JSON.parse(localStorage.getItem("songs"));
let current = null;

/* LOAD UI */
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.className = "song";
  div.innerHTML = `
    <img src="${song.cover}">
    <div>
      <b>${song.title}</b><br>
      <small>${song.artist}</small>
    </div>
    <button onclick="playSong(${index})">▶</button>
  `;
  playlist.appendChild(div);
});

window.playSong = function(index){
  current = songs[index];
  audio.src = current.audio;
  audio.play();
  nowTitle.textContent = current.title;
  nowArtist.textContent = current.artist;
  playBtn.textContent = "⏸";
}

playBtn.onclick = () => {
  if(!audio.src) return;
  if(audio.paused){
    audio.play();
    playBtn.textContent = "⏸";
  }else{
    audio.pause();
    playBtn.textContent = "▶";
  }
};
