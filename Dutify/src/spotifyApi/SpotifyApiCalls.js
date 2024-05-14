import SpotifyWebApi from "spotify-web-api-js";

const spotifyApiObject = new SpotifyWebApi();

const setAccessToken = (token) =>{
  spotifyApiObject.setAccessToken(token);
}

const getAccessToken = () =>{
  return spotifyApiObject.getAccessToken();
}

const getUser = async() => {
  const user = await spotifyApiObject.getMe();
  return user;
}

const getUserPlaylists = async () => {
  //spotifyApiObject.setAccessToken(token);
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

export {getAccessToken, setAccessToken, getUserPlaylists, getCategoriesID, getCategoriePlaylists, getUserOwnedPlaylists };
