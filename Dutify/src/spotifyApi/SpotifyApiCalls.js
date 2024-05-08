import SpotifyWebApi from "spotify-web-api-js";

const spotifyApiObject = new SpotifyWebApi();


const getUserPlaylists = async (token) => {
    
    spotifyApiObject.setAccessToken(token)

    const data = await spotifyApiObject.getUserPlaylists();
    
    const playlists = data.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        owner: playlist.owner,
        public: playlist.public,
        totalTracks: playlist.tracks.total,
        imageUrl: playlist.images[0] ? playlist.images[0].url : null
      }));
    console.log(data.items)
    return playlists;
  }

export { getUserPlaylists };
