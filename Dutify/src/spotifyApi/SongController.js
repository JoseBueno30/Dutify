import {EventEmitter} from "events"

let track = new Audio();
let queue = JSON.parse(window.sessionStorage.getItem("queue"));
let queueEmitter = new EventEmitter();

let i =
  window.sessionStorage.getItem("songIndex") === null
    ? 0
    : parseInt(window.sessionStorage.getItem("songIndex"));

const setTrack = (link) => {
  if (link !== null) {
    pauseTrack();
    track = new Audio(link);
    track.addEventListener("play", () => {
      console.log("Se ha comenzado/reanudado la reproducción");
    });
    track.addEventListener("ended", () => {
      nextQueueSong();
      console.log("Se ha terminado la reproducción");
    });
    track.addEventListener("timeupdate", () =>{
      window.sessionStorage.setItem("trackTime", track.currentTime);
    })
    playTrack();
  } else {
    console.error("No hay vista previa de esta cancion");
    nextQueueSong();
  }
};

const playTrack = () => {
  track.play();
};

const pauseTrack = () => {
  track.pause();
};

const getDuration = () => {
  return track.duration;
};

const getCurrentTime = () => {
  return track.currentTime;
};

const setQueue = (newQueue) => {
  i = 0;
  newQueue.push(track.src);
  window.sessionStorage.setItem("queue", JSON.stringify(newQueue));
  queue = newQueue;
};

const playQueue = () => {
  console.log("index: " + i);
  const url = queue[i];
  setTrack(url);
};

const nextQueueSong = () => {
  if (i + 1 < queue.length - 1) {
    i += 1;
  } else {
    i = 0;
    queue = [];
    window.sessionStorage.setItem("playlistPlaying", null);
    queueEmitter.emit("queueEnded");
  }
  saveAndPlay();
};

const previousQueueSong = () => {
  i -= 1;
  saveAndPlay();
};
const saveAndPlay = () => {
  window.sessionStorage.setItem("songIndex", i);
  playQueue();
};

const addTrackToQueue = (track) => {
  setTrack(track);
};

const setQueueIndex = (newIndex) => {
  i = newIndex;
  playQueue();
};

const getQueueIndex = () => {
  return i;
};

export {
  setTrack,
  playTrack,
  pauseTrack,
  getCurrentTime,
  getDuration,
  setQueue,
  playQueue,
  nextQueueSong,
  previousQueueSong,
  addTrackToQueue,
  setQueueIndex,
  getQueueIndex,

  // EVENTO COLA
  queueEmitter
};
