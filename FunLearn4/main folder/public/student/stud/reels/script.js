const video = document.getElementById('myVideo');
let currentReelIndex = 0;
const reelUrls = [
    '2.mp4',
    '3.mp4',
    '4.mp4',
    '5.mp4',
    '6.mp4',
    '7.mp4',
    '8.mp4',
    '9.mp4',
    '10.mp4'
    
];

function playVideo() {
    video.play();
}

function pauseVideo() {
    video.pause();
}

function nextReel() {
    currentReelIndex = (currentReelIndex + 1) % reelUrls.length;
    video.src = reelUrls[currentReelIndex];
    video.load();
    playVideo();
}

function prevReel() {
    currentReelIndex = (currentReelIndex - 1 + reelUrls.length) % reelUrls.length;
    video.src = reelUrls[currentReelIndex];
    video.load();
    playVideo();
}