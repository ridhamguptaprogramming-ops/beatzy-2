const list = document.getElementById("songList");

/* LOAD SONGS */
function loadSongs(){
  list.innerHTML = "";
  const songs = JSON.parse(localStorage.getItem("songs")) || [];

  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "admin-song";
    div.innerHTML = `
      <img src="${song.cover}">
      <div>
        <b>${song.title}</b><br>
        <small>${song.artist}</small>
      </div>
      <button onclick="deleteSong(${index})">🗑</button>
    `;
    list.appendChild(div);
  });
}

/* UPLOAD */
function uploadSong() {
  const title = document.getElementById("title").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const audioFile = document.getElementById("audio").files[0];
  const coverFile = document.getElementById("cover").files[0];

  if (!title || !artist || !audioFile || !coverFile) {
    alert("Fill all fields");
    return;
  }

  const audioReader = new FileReader();
  const coverReader = new FileReader();

  audioReader.onload = () => {
    coverReader.onload = () => {
      const songs = JSON.parse(localStorage.getItem("songs")) || [];
      songs.push({
        title,
        artist,
        audio: audioReader.result,
        cover: coverReader.result
      });
      localStorage.setItem("songs", JSON.stringify(songs));
      loadSongs();
      document.querySelectorAll("input").forEach(i => i.value = "");
    };
    coverReader.readAsDataURL(coverFile);
  };
  audioReader.readAsDataURL(audioFile);
}

/* DELETE */
function deleteSong(index){
  const songs = JSON.parse(localStorage.getItem("songs")) || [];
  if(confirm("Delete this song?")){
    songs.splice(index,1);
    localStorage.setItem("songs", JSON.stringify(songs));
    loadSongs();
  }
}

/* LOGOUT */
function logout(){
  localStorage.removeItem("adminLoggedIn");
  location.href = "login.html";
}

/* INIT */
loadSongs();
