import { EventEmitter } from "events";

let trackAudio = new Audio();
let trackObject;
let isPlaying;
var queue = JSON.parse(window.sessionStorage.getItem("queue"));
let queueEmitter = new EventEmitter();

let randomQueue = JSON.parse(window.sessionStorage.getItem("randomQueue"));

let isRandom = window.sessionStorage.getItem("random") === "true";
let inLoop = window.sessionStorage.getItem("loop") === "true";

let i =
  window.sessionStorage.getItem("songIndex") === null
    ? 0
    : parseInt(window.sessionStorage.getItem("songIndex"));

let trackVolume =
  window.sessionStorage.getItem("volume") === null
    ? 0.5
    : parseFloat(window.sessionStorage.getItem("volume"));

const setTrack = (track, time) => {
  if (track !== null && track.preview_url !== null) {
    // console.log(track.preview_url);
    pauseTrack();

    trackObject = track;
    trackAudio = new Audio(track.preview_url);
    trackAudio.volume = trackVolume;

    window.sessionStorage.setItem("currentTrack", JSON.stringify(track));
    queueEmitter.emit("newTrack");
    if (time !== undefined) trackAudio.currentTime = time;

    __addEvents();

    playTrack();
  } else {
    console.error("No hay vista previa de esta cancion");
    nextQueueSong();
  }
};

const setPausedTrack = (track, time) => {
  trackObject = track;
  trackAudio = new Audio(track.preview_url);
  trackAudio.volume = trackVolume;
  window.sessionStorage.setItem("currentTrack", JSON.stringify(track));
  queueEmitter.emit("newTrack");
  if (time !== undefined) trackAudio.currentTime = time;

  __addEvents();
};

const __addEvents = () => {
  trackAudio.addEventListener("play", () => {
    window.sessionStorage.setItem("trackStatus", true);
    //console.log("Se ha comenzado/reanudado la reproducción");
    queueEmitter.emit("trackStatusTrue");
  });
  trackAudio.addEventListener("pause", () => {
    window.sessionStorage.setItem("trackStatus", false);
    queueEmitter.emit("trackStatusFalse");
  });
  trackAudio.addEventListener("ended", () => {
    nextQueueSong();
    //console.log("Se ha terminado la reproducción");
  });
  trackAudio.addEventListener("timeupdate", () => {
    queueEmitter.emit("timeUpdate");
    window.sessionStorage.setItem("currentTrackTime", trackAudio.currentTime);
  });
};

const setSingleTrack = (track) => {
  queueEmitter.emit("queueEnded");
  i = 0;
  queue = null;
  window.sessionStorage.setItem("queue", JSON.stringify(queue));
  window.sessionStorage.setItem("randomQueue", JSON.stringify(queue));
  setTrack(track);
};

const getTrackAudio = () => {
  return trackAudio;
};

const playTrack = () => {
  console.log(trackAudio.src);
  trackAudio.play();
  isPlaying = true;
};

const pauseTrack = () => {
  trackAudio.pause();
  isPlaying = false;
};

const getDuration = () => {
  return trackAudio.duration;
};

const getTrackCurrentTime = () => {
  return trackAudio.currentTime;
};

const setTrackCurrentTime = (newCurrentTime) => {
  pauseTrack();
  trackAudio.currentTime = parseFloat(newCurrentTime);
  playTrack();
};

const setQueue = (newQueue) => {
  i = 0;
  if (trackObject !== undefined && trackObject !== null)
    newQueue.push(trackObject);
  window.sessionStorage.setItem("queue", JSON.stringify(newQueue));
  queue = newQueue;
  // console.log(queue)
  isRandom = false;
  inLoop = false;
  randomQueue = newQueue;
  window.sessionStorage.setItem("randomQueue", JSON.stringify(newQueue));
  __saveAuxQueue();
};
const __saveAuxQueue = () => {
  let queueAux = [];
  queue.forEach((element) => {
    // console.log(element)
    queueAux.push(element.name);
  });
  console.log(queueAux);
  window.sessionStorage.setItem("queueAux", JSON.stringify(queueAux));
};

const playQueue = () => {
  console.log("index: " + i);
  let url;
  if (!isRandom) url = queue[i];
  else url = randomQueue[i];
  setTrack(url);
};

const nextQueueSong = () => {
  if (queue !== null && !inLoop) {
    if (i + 1 < queue.length - 1) {
      i += 1;
    } else {
      i = 0;
      queue = null;
      window.sessionStorage.setItem("playlistPlaying", queue);
      window.sessionStorage.setItem("queue", queue);
      queueEmitter.emit("queueEnded");
    }
  }
  _saveAndPlay();
};

const previousQueueSong = () => {
  if (queue !== null && !inLoop) {
    if (i - 1 >= 0) {
      i -= 1;
    } else {
      i = 0;
      pauseTrack();
      queue = null;
      window.sessionStorage.setItem("playlistPlaying", queue);
      window.sessionStorage.setItem("queue", queue);
      queueEmitter.emit("queueEnded");
    }
  }
  _saveAndPlay();
};
const _saveAndPlay = () => {
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

const getTrackObject = () => {
  return trackObject;
};

const setVolume = (volume) => {
  trackVolume = volume / 100;
  trackAudio.volume = trackVolume;
  window.sessionStorage.setItem("volume", trackVolume);
};

const setRandomQueue = () => {
  isRandom = !isRandom;
  console.log("random: " + isRandom);
  window.sessionStorage.setItem("random", isRandom);
  if (isRandom) {
    __shuffle(randomQueue);
    window.sessionStorage.setItem("randomQueue", JSON.stringify(randomQueue));
  } else {
    const queueAux = JSON.parse(window.sessionStorage.getItem("queueAux"));
    i = queueAux.indexOf(trackObject.name);
  }
};

const __shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const setLoopTrack = () => {
  inLoop = !inLoop;
  window.sessionStorage.setItem("loop", inLoop);
};

const isTrackPlaying = () => {
  return isPlaying;
}

const isTrackInPlayer = (track) => {
  return trackObject!== undefined && track.uri === trackObject.uri;
}

export {
  // TRACK FUNCTIONS
  setTrack,
  setPausedTrack,
  setSingleTrack,
  getTrackAudio,
  playTrack,
  pauseTrack,
  setLoopTrack,

  // TRACK PROPERTIES
  getTrackCurrentTime,
  getDuration,
  setVolume,
  setTrackCurrentTime,

  // QUEUE FUNCTIONS
  setQueue,
  playQueue,
  nextQueueSong,
  previousQueueSong,
  addTrackToQueue,
  setQueueIndex,
  getQueueIndex,
  setRandomQueue,

  // TRACK OBJECT
  getTrackObject,
  isTrackPlaying,
  isTrackInPlayer,

  // EVENTO COLA
  queueEmitter,
};
