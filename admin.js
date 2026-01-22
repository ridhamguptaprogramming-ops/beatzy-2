let songs = JSON.parse(localStorage.getItem("songs")) || [];
const adminList = document.getElementById("adminList");

function uploadSong() {
  const title = document.getElementById("songTitle").value;
  const artist = document.getElementById("songArtist").value;
  const songFile = document.getElementById("songFile").files[0];
  const coverFile = document.getElementById("coverImage").files[0];

  if (!title || !artist || !songFile || !coverFile) {
    alert("Fill all fields");
    return;
  }

  const readerSong = new FileReader();
  const readerCover = new FileReader();

  readerSong.onload = () => {
    readerCover.onload = () => {
      songs.push({
        title,
        artist,
        audio: readerSong.result,
        cover: readerCover.result
      });

      localStorage.setItem("songs", JSON.stringify(songs));
      showAdminSongs();
      alert("Song Uploaded!");
    };
    readerCover.readAsDataURL(coverFile);
  };
  readerSong.readAsDataURL(songFile);
}

function showAdminSongs() {
  adminList.innerHTML = "";
  songs.forEach(song => {
    const li = document.createElement("li");
    li.textContent = song.title;
    adminList.appendChild(li);
  });
}

showAdminSongs();
