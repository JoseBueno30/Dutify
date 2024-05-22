let track = new Audio();
let queue = [];
let i = 0;

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
  newQueue.push(track.src);
  console.log(newQueue);
  window.sessionStorage.setItem("queue", JSON.stringify(newQueue));
  queue = newQueue;
};

const playQueue = () => {
  const url = queue[0];
  setTrack(url);
};

const nextQueueSong = () => {
  queue.shift();
  window.sessionStorage.setItem("queue", JSON.stringify(queue));
  playQueue();
};

export {
  setTrack,
  playTrack,
  pauseTrack,
  getCurrentTime,
  getDuration,
  setQueue,
  playQueue,
};
