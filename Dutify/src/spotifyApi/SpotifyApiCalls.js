import SpotifyWebApi from "spotify-web-api-js";

const spotifyApiObject = new SpotifyWebApi();

const setAccessToken = (token) =>{
  spotifyApiObject.setAccessToken(token);
}

const getAccessToken = () =>{
  return spotifyApiObject.getAccessToken();
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
    const playlistsResponse = await spotifyApiObject.searchPlaylists(`description:${artist_name}`, {limit: 1});
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


const mapPlaylistObject = (data) => {
  const playlists = data.items.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    owner: playlist.owner,
    public: playlist.public,
    totalTracks: playlist.tracks.total,
    imageUrl: playlist.images[0] ? playlist.images[0].url : null,
  }));

  return playlists;
};

export {getAccessToken, setAccessToken, getUserPlaylists, getCategoriesID, getCategoriePlaylists
  , getPopularPlaylists, getPopularArtistsPlaylists, getRecommendedPlaylists };
