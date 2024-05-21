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
  let tracks = [];
  let offset = 0;

  while(true){
    const data = await spotifyApiObject.getPlaylistTracks(playlist.id, {offset: offset, limit: 100})
    tracks = tracks.concat(data.items)
    if(data.items.length < 100){
      break;
    }
    offset += 100;
  }

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


const createPlaylist = async (nameList,publicList) => {
  const playListDetails = {
    name: nameList,
    public: publicList,
  }
  const userId = await getUserId();

  const data = await spotifyApiObject.createPlaylist(userId, playListDetails);
  return data;
};

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

const addTrackToPlayList = async (track, playList) => {
  console.log(playList.id);
  console.log([track.uri]);
  try{
    spotifyApiObject.addTracksToPlaylist(playList.id, [track.uri]);
  }catch(error){
    console.error("ERROR: ", error);
  }  
}

const removeTrackFromPlayList = async (track, playlistId) => {
  console.log(playlistId);
  console.log([track.uri]);
  try{
    await spotifyApiObject.removeTracksFromPlaylist(playlistId, [track.uri]);
  }catch(error){
    console.error("ERROR: ", error);
  }
}

const addTrackToFavorites = async (track) => {
  console.log([track.uri]);
  try{
    await spotifyApiObject.addToMySavedTracks([track.id]);
  }catch(error){
    console.error("ERROR: ", error);
  }  
}

const addTrackCallBack = (errorObject, succedValue) =>{
  console.log(errorObject);
  console.log(succedValue);
}

const searchTracks = async (query,num) => {
  let data = await spotifyApiObject.searchTracks(query, { limit: num })

  return data.tracks.items;
}

const searchTopTracks = async (num) => {
  let data = await spotifyApiObject.getMyTopTracks({ limit: num })

  return data.items;
}

export {getAccessToken, setAccessToken, getUserPlaylists, getCategoriesID,
  getCategoriePlaylists, getUserOwnedPlaylists, addTrackToPlayList, getPlayList,
  getTracksFromPlaylist, removeTrackFromPlayList, addTrackToFavorites, createPlaylist,
  searchTracks, getUser, getPopularArtistsPlaylists, getPopularPlaylists, getRecommendedPlaylists,
  searchTopTracks};
