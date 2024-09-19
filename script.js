document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('playPause');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const progress = document.getElementById('progress');
    const volume = document.getElementById('volume');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playlistElement = document.getElementById('playlist');

    const playlist = [
        { 
            title: 'Song 1', 
            artist: 'Artist 1', 
            src: 'song1.mp3', 
            duration: '3:15', 
            image: 'https://via.placeholder.com/50?text=1' 
        },
        { 
            title: 'Song 2', 
            artist: 'Artist 2', 
            src: 'song2.mp3', 
            duration: '2:45', 
            image: 'https://via.placeholder.com/50?text=2' 
        },
        { 
            title: 'Song 3', 
            artist: 'Artist 3', 
            src: 'song3.mp3', 
            duration: '4:05', 
            image: 'https://via.placeholder.com/50?text=3' 
        }
    ];

    let currentSongIndex = 0;

    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.src;
        playPauseButton.textContent = 'Play';
        updatePlaylist();
    }

    function updatePlaylist() {
        playlistElement.innerHTML = playlist.map((song, index) =>
            `<li class="${index === currentSongIndex ? 'active' : ''}">
                <img src="${song.image}" alt="${song.title}">
                ${song.title} - ${song.artist} (${song.duration})
            </li>`
        ).join('');
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    audio.addEventListener('loadedmetadata', () => {
        progress.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        progress.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    progress.addEventListener('input', () => {
        audio.currentTime = progress.value;
    });

    volume.addEventListener('input', () => {
        audio.volume = volume.value;
    });

    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        audio.play();
        playPauseButton.textContent = 'Pause';
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        audio.play();
        playPauseButton.textContent = 'Pause';
    });

    loadSong(currentSongIndex);
});
