import SpotifyWebApi from "spotify-web-api-js";

const spotifyApiObject = new SpotifyWebApi();

const setAccessToken = (token) =>{
  spotifyApiObject.setAccessToken(token);
}

const getAccessToken = () =>{
  return spotifyApiObject.getAccessToken();
}

const getUser = async () => {
  const user = await spotifyApiObject.getMe();

  return user;
}

const getUserId = async () => {
  const data = await spotifyApiObject.getMe();

  return data.id;
}

const getUserPlaylists = async () => {

  const data = await spotifyApiObject.getUserPlaylists();
  const playlists = mapPlaylistObject(data);

  return playlists;
};

const getUserOwnedPlaylists = async () => {
  const data = await spotifyApiObject.getUserPlaylists();
  const user = await getUser();
  const playlists = mapPlaylistObject(data);

  const ownedPlaylists = playlists.filter((playList) => playList.owner.id == user.id)

  console.log(ownedPlaylists);

  return ownedPlaylists;
};

const getPlayList = async (playlistId) => {
  let playlist;
  try{
    playlist = await spotifyApiObject.getPlaylist(playlistId);
  }catch(error){
    playlist=null;
  }
 
  return playlist;
};

const getTracksFromPlaylist = async (playlist) =>{
  let next = playlist.tracks.next;
  let tracks = playlist.tracks.items.map(item => item.track);
  
  // while(next !== null){
  //   let moreTracks = await spotifyApiObject.getPlaylistTracks(playlist.id, {offset:tracks.length})
  //   next = moreTracks.next;
    
  //   moreTracks = moreTracks.items.map(item => item.track);
    
  //   tracks = tracks.concat(moreTracks);
  // }
  console.log(tracks);
  return tracks;
}

const getCategoriesID = () =>{
  spotifyApiObject.getCategories({limit: 50}).then((data) => {
    console.log(data.categories.items);
  });
}

const getCategoriePlaylists = async (catergoryID, limit) =>{
  const data = await spotifyApiObject.getCategoryPlaylists(catergoryID, {limit});

  const playlists = mapPlaylistObject(data.playlists);

  return playlists;
}

const getPopularPlaylists = async () => {
  const data = await spotifyApiObject.getFeaturedPlaylists({limit: 8});
  const playlists = mapPlaylistObject(data.playlists);
 
  return playlists;
};


const getPopularArtistsPlaylists = async () => {
  const playlists = []
  const my_top_artists = await spotifyApiObject.getMyTopArtists({limit: 8});
  const artists_names = my_top_artists.items.map(artist => artist.name);
  
  for (const artist_name of artists_names) {
    const playlistsResponse = await spotifyApiObject.searchPlaylists(`This Is ${artist_name}`, {limit: 1});
    playlists.push(...mapPlaylistObject(playlistsResponse.playlists));
  }

  return playlists;
};


const getRecommendedPlaylists = async () => {
  const catergory = "0JQ5DAt0tbjZptfcdMSKl3"; // Categoria: Especialmente para ti
  const limite = 8;
  const playlists = getCategoriePlaylists(catergory,limite);

  return playlists;
};


const createPlaylist = async (listName,listPrivacy) => {
  const playListDetails = {
    name: listName,
    public: listPrivacy,
  }
  const userId = await getUserId();

  const playlist = await spotifyApiObject.createPlaylist(userId, playListDetails);
  return playlist;
};

const changePlaylistName = async (playlistId, playlistName) => {
  const playListDetails = {name: playlistName};
  await spotifyApiObject.changePlaylistDetails(playlistId, playListDetails);
}

const mapPlaylistObject = (data) => {
  const playlists = data.items.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    owner: playlist.owner,
    public: playlist.public,
    totalTracks: playlist.tracks.total,
    imageUrl: (playlist.images && playlist.images.length > 0) ? playlist.images[0].url : null,
  }));

  return playlists;
};

const addTrackToPlayList = async (track, playlist) => {
  let status;
  try{
    const playlistTracks = await getTracksFromPlaylist(await getPlayList(playlist.id));
    if(playlistTracks.some(playlistTrack => playlistTrack.uri === track.uri)){
      status = "Esta canción ya está en "+ playlist.name;
    }else{
      spotifyApiObject.addTracksToPlaylist(playlist.id, [track.uri]);
      status = "Canción añadida a " + playlist.name;
    }
  }catch(error){
    console.error("ERROR: ", error);
    status = "Error añadiendo canción";
  }  
  return status;
}

const removeTrackFromPlayList = async (track, playlistId) => {
  let status;
  try{
    await spotifyApiObject.removeTracksFromPlaylist(playlistId, [track.uri]);
    status = "Canción eliminada de la playlist";
  }catch(error){
    console.error("ERROR: ", error);
    status = "Error eliminando canción";
  }
  return status;
}

const addTrackToFavorites = async (track) => {
  console.log([track.uri]);
  let status;
  try{
    await spotifyApiObject.addToMySavedTracks([track.id]);
    status = "Canción añadida a favoritas";
  }catch(error){
    console.error("ERROR: ", error);
    status = "Error añadiendo canción";
  }  
  return status;
}

const unfollowPlaylist = async (playlistId) =>{
  await spotifyApiObject.unfollowPlaylist(playlistId);
}

const searchTracks = async (query,num) => {
  let data = await spotifyApiObject.searchTracks(query, { limit: num })
  console.log(data.tracks.items)
  return data.tracks.items;
}

export {getAccessToken, setAccessToken, getUserPlaylists, getCategoriesID,
  getCategoriePlaylists, getUserOwnedPlaylists, addTrackToPlayList, getPlayList,
  getTracksFromPlaylist, removeTrackFromPlayList, addTrackToFavorites, createPlaylist,
  searchTracks, getUser, getPopularArtistsPlaylists, changePlaylistName, getPopularPlaylists, getRecommendedPlaylists};
