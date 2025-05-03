const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playlistContainer = document.getElementById('playlist');

const songs = [
  {
    name: 'song1',
    title: 'Woh Din',
    artist: 'Arijit Singh',
    cover: 'covers/cover1.jpeg'
  },
  {
    name: 'song2',
    title: 'Galliyan',
    artist: 'Ankit Tiwari',
    cover: 'covers/cover2.jpeg'
  },
  {
    name: 'song3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'covers/cover3.jpg'
  },
  {
    name: 'song4',
    title: 'Unstoppable',
    artist: 'Sia',
    cover: 'covers/cover4.jpg'
  }
];

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `songs/${song.name}.mp3`;
  cover.src = song.cover;
  renderPlaylist();
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

function renderPlaylist() {
  playlistContainer.innerHTML = '';
  songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.textContent = `${song.title} - ${song.artist}`;
    songItem.classList.toggle('active', index === songIndex);
    songItem.addEventListener('click', () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistContainer.appendChild(songItem);
  });
}

// Button actions
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? '#0f0' : '#00f2fe';
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? '#0f0' : '#00f2fe';
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    playSong();
  } else if (isShuffle) {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * songs.length);
    } while (nextIndex === songIndex);
    songIndex = nextIndex;
    loadSong(songs[songIndex]);
    playSong();
  } else {
    nextBtn.click();
  }
});

loadSong(songs[songIndex]);
