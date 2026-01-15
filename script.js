// Initialize Audio Object
let audio = new Audio();
let isPlaying = false;

const playBtn = document.getElementById('master-play');
const trackRows = document.querySelectorAll('.track');
const titleDisplay = document.getElementById('current-title');
const artistDisplay = document.getElementById('current-artist');

// 1. Function to handle Play/Pause
function togglePlay() {
    if (audio.src) {
        if (isPlaying) {
            audio.pause();
            playBtn.innerText = "▶";
        } else {
            audio.play();
            playBtn.innerText = "⏸";
        }
        isPlaying = !isPlaying;
    }
}

// 2. Click event for each track
trackRows.forEach(track => {
    track.addEventListener('click', () => {
        // Remove active class from others
        trackRows.forEach(t => t.classList.remove('active-track'));
        track.classList.add('active-track');

        // Update Audio Source and UI
        const src = track.getAttribute('data-src');
        const title = track.getAttribute('data-title');
        const artist = track.getAttribute('data-artist');

        audio.src = src;
        titleDisplay.innerText = title;
        artistDisplay.innerText = artist;

        // Play the song
        audio.play();
        isPlaying = true;
        playBtn.innerText = "⏸";
    });
});

// 3. Master Play Button Listener
playBtn.addEventListener('click', togglePlay);