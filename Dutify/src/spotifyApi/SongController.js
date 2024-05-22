let track = new Audio();
let queue = JSON.parse(window.sessionStorage.getItem("queue"));
let i = window.sessionStorage.getItem("songIndex") === null ? 0 : parseInt(window.sessionStorage.getItem("songIndex"));

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
    playTrack();
  }else{
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
  console.log(newQueue);
  window.sessionStorage.setItem("queue", JSON.stringify(newQueue));
  queue = newQueue;
};

const playQueue = () => {
  console.log("index: " + i)
  const url = queue[i];
  setTrack(url);
};

const nextQueueSong = () => {
  i += 1;
  saveAndPlay();
};

const previousQueueSong = () =>{
  i -= 1;
  saveAndPlay();
}
const saveAndPlay = () =>{
  window.sessionStorage.setItem("songIndex", i);
  playQueue();
}

export {
  setTrack,
  playTrack,
  pauseTrack,
  getCurrentTime,
  getDuration,
  setQueue,
  playQueue,
  nextQueueSong,
  previousQueueSong
};
