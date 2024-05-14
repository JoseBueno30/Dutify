import SpotifyWebApi from "spotify-web-api-js";

const spotifyApiObject = new SpotifyWebApi();

const setAccessToken = (token) =>{
  spotifyApiObject.setAccessToken(token);
}

const getAccessToken = () =>{
  return spotifyApiObject.getAccessToken();
}

const getUserId = async () => {
  const data = await spotifyApiObject.getMe();

  return data.id;
}

const getUserPlaylists = async (token) => {
  //spotifyApiObject.setAccessToken(token);
  const data = await spotifyApiObject.getUserPlaylists();

  const playlists = mapPlaylistObject(data);

  return playlists;
};

const getCategoriesID = () =>{
  spotifyApiObject.getCategories({limit: 50}).then((data) => {
    console.log(data.categories.items);
  });
}

const getCategoriePlaylists = async (catergoryID) =>{
  const data = await spotifyApiObject.getCategoryPlaylists(catergoryID);

  const playlists = mapPlaylistObject(data.playlists);

  return playlists;
}

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

export {getAccessToken, setAccessToken, getUserPlaylists, getCategoriesID, getCategoriePlaylists, createPlaylist};
