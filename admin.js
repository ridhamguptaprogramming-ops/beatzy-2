let songs = JSON.parse(localStorage.getItem("songs")) || [];
const adminList = document.getElementById("adminList");

/* Upload Song */
function uploadSong() {
  const titleInput = document.getElementById("songTitle");
  const artistInput = document.getElementById("songArtist");
  const songInput = document.getElementById("songFile");
  const coverInput = document.getElementById("coverImage");

  const title = titleInput.value.trim();
  const artist = artistInput.value.trim();
  const songFile = songInput.files[0];
  const coverFile = coverInput.files[0];

  if (!title || !artist || !songFile || !coverFile) {
    alert("❌ Please fill all fields");
    return;
  }

  // Optional size check (LocalStorage safe)
  if (songFile.size > 10 * 1024 * 1024) {
    alert("❌ Song size must be under 10MB");
    return;
  }

  const readerSong = new FileReader();
  const readerCover = new FileReader();

  readerSong.onload = () => {
    readerCover.onload = () => {

      songs.push({
        id: Date.now(),
        title,
        artist,
        audio: readerSong.result,
        cover: readerCover.result
      });

      localStorage.setItem("songs", JSON.stringify(songs));
      showAdminSongs();

      // Reset form
      titleInput.value = "";
      artistInput.value = "";
      songInput.value = "";
      coverInput.value = "";

      alert("✅ Song Uploaded Successfully 🎄");
    };

    readerCover.readAsDataURL(coverFile);
  };

  readerSong.readAsDataURL(songFile);
}

/* Show Songs */
function showAdminSongs() {
  adminList.innerHTML = "";

  if (songs.length === 0) {
    adminList.innerHTML = "<li>No songs uploaded</li>";
    return;
  }

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${song.title}
      <button onclick="deleteSong(${index})">🗑</button>
    `;
    adminList.appendChild(li);
  });
}

/* Delete Song */
function deleteSong(index) {
  if (!confirm("Delete this song?")) return;

  songs.splice(index, 1);
  localStorage.setItem("songs", JSON.stringify(songs));
  showAdminSongs();
}

/* Init */
showAdminSongs();
