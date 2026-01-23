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

      const song = {
        title,
        artist,
        audio: audioReader.result, // base64 mp3
        cover: coverReader.result  // base64 image
      };

      const songs = JSON.parse(localStorage.getItem("songs")) || [];
      songs.push(song);
      localStorage.setItem("songs", JSON.stringify(songs));

      alert("Song uploaded successfully ✅");
      document.querySelectorAll("input").forEach(i => i.value = "");
    };

    coverReader.readAsDataURL(coverFile);
  };

  audioReader.readAsDataURL(audioFile);
}
