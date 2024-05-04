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

const playbtn = document.getElementById('play-btn');
const podcastImg = document.getElementById('podcast-image');
const podcastName = document.getElementById('podcast-name');
const podcastArtist = document.getElementById('podcast-artist');
const audio = document.getElementById('main-audio');
const podcastList = JSON.parse('<%- JSON.stringify(podcasts) %>');

playbtn.addEventListener('click', () => {
  const podcastId = playbtn.dataset.podcastId;
  console.log(podcastId)
  const selectedPodcast = podcastList.find(podcast => podcast.podcastId === podcastId);

  podcastImg.src = selectedPodcast.photo;
  podcastName.textContent = selectedPodcast.name;
  podcastArtist.textContent = selectedPodcast.firstName + " " + selectedPodcast.lastName;
  audio.src = selectedPodcast.audio;
});