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
    console.log(i);

let trackVolume =
  window.sessionStorage.getItem("volume") === null
    ? 0.5
    : parseFloat(window.sessionStorage.getItem("volume"));

const setTrack = (track, time) => {
  if (track !== null && track.preview_url !== null) {
    console.log(track.preview_url);
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
  let length = 0;
  try{
    length = isRandom ? randomQueue.length : queue.length;
  }catch(e){};

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
    if(i < length - 1)nextQueueSong();
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
  window.sessionStorage.setItem("playlistPlaying", null);
  window.sessionStorage.setItem("randomQueue", JSON.stringify(queue));
  setTrack(track);
};

const getTrackAudio = () => {
  return trackAudio;
};

const playTrack = () => {
  // console.log(queue);
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
  // if (trackObject !== undefined && trackObject !== null)
  //   newQueue.push(trackObject);
  window.sessionStorage.setItem("queue", JSON.stringify(newQueue));
  queue = newQueue;
  // console.log(queue)
  randomQueue = newQueue.slice();
  if (isRandom) __shuffle(randomQueue);
  window.sessionStorage.setItem("randomQueue", JSON.stringify(newQueue));
  __saveAuxQueue();
};
const __saveAuxQueue = () => {
  let queueAux = [];
  queue.forEach((element) => {
    // console.log(element)

    if (element !== null) queueAux.push(element.name);
  });
  window.sessionStorage.setItem("queueAux", JSON.stringify(queueAux));
};

const playQueue = () => {
  //console.log("index: " + i + " en random: " + isRandom);
  let url;
  if(i === queue.length){ 
    i = 0;
    __shuffle(randomQueue);
  }
  if (!isRandom) url = queue[i];
  else url = randomQueue[i];
  setTrack(url);
};

const nextQueueSong = () => {
  if (queue !== null) {
    if (i < queue.length - 1) {
      i += 1;
    } else {
      if (!inLoop) {
         if (i !== queue.length) i += 1;
        pauseTrack();
        trackAudio.currentTime = getDuration();
        queueEmitter.emit("queueEnded");
      }else if(inLoop){
        i = 0;        
      } else if (isRandom) {
        __shuffle(randomQueue);
      }
    }
  }else if(trackAudio){
    pauseTrack();
    trackAudio.currentTime = getDuration();
  }
  _saveAndPlay();
};

const previousQueueSong = () => {
  if (queue !== null) {
    if (i - 1 >= 0) {
      i -= 1;
      __checkPreviewURL();
    } else {
      i = 0;
      playQueue();
    }
  }else if(trackAudio){
    if(isPlaying) pauseTrack();
    trackAudio.currentTime = 0;
    playTrack();
  }
  _saveAndPlay();
};

const __checkPreviewURL = () => {
  let possibleTrack;
  if (isRandom) possibleTrack = randomQueue[i];
  else possibleTrack = queue[i];

  if (!possibleTrack.preview_url){
    i -= 1;
    __checkPreviewURL();
  }
};

const _saveAndPlay = () => {
  window.sessionStorage.setItem("songIndex", i);
 let length = 0;
  try{
    length = isRandom ? randomQueue.length : queue.length;
  }catch(e){};

  if (queue !== null && i < length) playQueue();
};

const addTrackToQueue = (track) => {
  if (queue && !queue.includes(track)) {
    console.log(queue);
    queue = [...queue, track];
    window.sessionStorage.setItem("queue", JSON.stringify(queue));
    if (randomQueue) {
      randomQueue = [...randomQueue, track];
      window.sessionStorage.setItem("randomQueue", JSON.stringify(randomQueue));
    }
    console.log(queue);
  }
};

const setQueueIndex = (newIndex) => {
  i = newIndex;
  if (isRandom) {
    console.log("deberia reproducir cola normal antes");
    isRandom = false;
    playQueue();
    setRandomQueue();
  } else {
    playQueue();
  }
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
    __moveCurrentTrackInRandomQueue();
    i = 0;
    window.sessionStorage.setItem("randomQueue", JSON.stringify(randomQueue));
  } else {
    const queueAux = JSON.parse(window.sessionStorage.getItem("queueAux"));
    i = queueAux.indexOf(trackObject.name);
  }
};

const __shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const __moveCurrentTrackInRandomQueue = () =>{
  const i = randomQueue.indexOf(trackObject);
  randomQueue.splice(i, 1);
  randomQueue.unshift(trackObject)
}

const setLoopTrack = () => {
  inLoop = !inLoop;
  window.sessionStorage.setItem("loop", inLoop);
};

const isTrackPlaying = () => {
  return isPlaying;
};

const isTrackInPlayer = (track) => {
  return trackObject !== undefined && track.uri === trackObject.uri;
};

const removeTrackFromQueue = (track) => {
  if (queue) {
    let index = queue.indexOf(track);
    queue.splice(index, 1);
    //console.log(queue);
    window.sessionStorage.setItem("queue", JSON.stringify(queue));
    if (randomQueue) {
      index = randomQueue.indexOf(track);
      randomQueue.splice(index, 1);
      window.sessionStorage.setItem("randomQueue", JSON.stringify(randomQueue));
    }
  }
};

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
  removeTrackFromQueue,

  // TRACK OBJECT
  getTrackObject,
  isTrackPlaying,
  isTrackInPlayer,

  // EVENTO COLA
  queueEmitter,
};
