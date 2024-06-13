function openModal(imgSrc, description) {
    var modal = document.getElementById('modal');
    var overlay = document.getElementById('overlay');
    var modalImg = document.getElementById('modal-img');
    var modalDesc = document.getElementById('modal-desc');

    modal.style.display = "block";
    overlay.style.display = "block"; // Exibe o overlay
    modalImg.src = imgSrc;
    modalDesc.innerText = description;
}

function closeModal() {
    var modal = document.getElementById('modal');
    var overlay = document.getElementById('overlay');

    modal.style.display = "none";
    overlay.style.display = "none"; // Oculta o overlay
}

var audio = document.getElementById('background-music');
var playPauseButton = document.getElementById('play-pause-btn');
var seekBar = document.getElementById('seek-bar');
var elapsedTime = document.getElementById('elapsed-time');
var totalTime = document.getElementById('total-time');
var volumeControl = document.getElementById('volume-bar'); // Controle deslizante de volume

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

function changeMusic() {
    var musicSelector = document.getElementById('music-selector');
    var selectedMusic = musicSelector.value;
    audio.src = selectedMusic;
    audio.play();
    playPauseButton.textContent = 'Pause';
}

audio.addEventListener('loadedmetadata', function() {
    var totalMinutes = Math.floor(audio.duration / 60);
    var totalSeconds = Math.floor(audio.duration % 60);
    totalTime.textContent = totalMinutes + ':' + (totalSeconds < 10 ? '0' : '') + totalSeconds;
});

audio.addEventListener('timeupdate', function() {
    var elapsedMinutes = Math.floor(audio.currentTime / 60);
    var elapsedSeconds = Math.floor(audio.currentTime % 60);
    elapsedTime.textContent = elapsedMinutes + ':' + (elapsedSeconds < 10 ? '0' : '') + elapsedSeconds;

    var progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;
});

seekBar.addEventListener('input', function() {
    var seekTime = (seekBar.value * audio.duration) / 100;
    audio.currentTime = seekTime;
});

// Adiciona um ouvinte de evento para o evento input do controle deslizante de volume
volumeControl.addEventListener('input', function() {
    var volume = volumeControl.value / 100; // Obtém o valor do controle de volume e divide por 100
    audio.volume = volume; // Define o volume do áudio
});
