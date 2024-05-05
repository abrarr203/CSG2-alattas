// const { json } = require("express");

const  podcastContainers = [...document.querySelectorAll('.podcast-cards')];
const nextBtn_ = [...document.querySelectorAll('.right-arrow')];
const prevBtn_ = [...document.querySelectorAll('.left-arrow')];
podcastContainers.forEach((item, i) =>{
  let containerDimension = item.getBoundingClientRect();
  let containerWidth = containerDimension.width;
  nextBtn_[i].addEventListener('click', ()=>{
    tem.scrollLeft += containerWidth;
  });
  prevBtn_[i].addEventListener('click', ()=> {
    item.scrollLeft -= containerWidth;
  });
});

const playbtns = document.querySelectorAll('#play-btn');
const podcastImg = document.getElementById('podcast-image');
const podcastName = document.getElementById('podcast-name');
const podcastArtist = document.getElementById('podcast-artist');
const audio = document.getElementById('main-audio');
const playController = document.getElementById('play-button');
const progressArea = document.getElementById("progress-area");
const progressBar = document.getElementById("progress-bar");
const container = document.getElementById("play-section");

let isPlaying = false;

playbtns.forEach(playbtn => {
    playbtn.addEventListener("click", (event) => {
        const podcastData = JSON.parse(event.target.dataset.podcast);
        console.log(podcastData);


        podcastImg.src = '/audio/' + podcastData.photo;
        podcastName.textContent = podcastData.name;
        podcastArtist.textContent = podcastData.firstName + ' ' + podcastData.lastName;
        audio.src = '/audio/' + podcastData.audio;
        playMusic();
    });
});

playController.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});

function playMusic() {
    isPlaying = true;          
    audio.play();
};

function pauseMusic() {
    isPlaying = false;
    audio.pause();
};

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let podcastCurrentTime = document.getElementById("current-time"),
    podcastDuration = document.getElementById("max-duration");
  
    audio.addEventListener("loadeddata", () => {
        const interval = setInterval(() => {
        const _elapsed = audio.currentTime;
        podcastCurrentTime.innerHTML = formatTime(_elapsed);
    }, 1000);
        const _duration = audio.duration;
        podcastDuration.innerHTML = formatTime(_duration);
        audio.addEventListener("ended", () => {
            clearInterval(interval);
        });
    });
});
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let podcastDuration = audio.duration;
  
    audio.currentTime = (clickedOffsetX / progressWidth) * podcastDuration;
    playMusic();
});
function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return "00:00";
}

const allPodcasts =JSON.parse(document.getElementById('allPodcasts').getAttribute('data-podcastList'));

const nextAudio = document.getElementById('next');
const prevAudio = document.getElementById('prev');

nextAudio.addEventListener('click', (event)=> {
  const podcastId = Number(nextAudio.getAttribute('value')); // podcast id
  const prev = Number(prevAudio.getAttribute('value'));
  const nextPodcast = allPodcasts.find(podcast => podcast.podcastId === podcastId);
  console.log(nextPodcast)
  if(nextPodcast){
    nextAudio.setAttribute('value', podcastId + 1);
    prevAudio.setAttribute('value', prev + 1);
    podcastImg.src = '/audio/' +nextPodcast.photo;
    podcastName.textContent = nextPodcast.name;
    podcastArtist.textContent = nextPodcast.firstName + ' ' + nextPodcast.lastName;
    audio.src = '/audio/' + nextPodcast.audio;
    playMusic();
  } else {
      nextAudio.setAttribute('value', 1);
  }
});

prevAudio.addEventListener('click', (event)=> {
  const podcastId = Number(prevAudio.getAttribute('value'));
  const next = Number(nextAudio.getAttribute('value'));
  const prevPodcast = allPodcasts.find(podcast => podcast.podcastId === podcastId);;
  console.log(prevPodcast);
  if(prevPodcast){
    prevAudio.setAttribute('value', podcastId - 1);
    nextAudio.setAttribute('value', next - 1);
    podcastImg.src = '/audio/' + prevPodcast.photo;
    podcastName.textContent = prevPodcast.name;
    podcastArtist.textContent = prevPodcast.firstName + ' ' + prevPodcast.lastName;
    audio.src = '/audio/' + prevPodcast.audio;
    playMusic();
  } else {
    prevAudio.setAttribute('value', allPodcasts.length);
  }
  // };
});

document.addEventListener('DOMContentLoaded', () => {
  podcastImg.src = '/audio/' + allPodcasts[0].photo;
    podcastName.textContent = allPodcasts[0].name;
    podcastArtist.textContent = allPodcasts[0].firstName + ' ' + allPodcasts[0].lastName;
    audio.src = '/audio/' + allPodcasts[0].audio;
});