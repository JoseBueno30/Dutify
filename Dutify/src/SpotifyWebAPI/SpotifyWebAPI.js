export class SpotifyWebAPI{
    token;

    constructor(token){
        this.token = token;
    }

    async fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${this.token}`,
        },
        method,
        body: JSON.stringify(body),
        });
        return await res.json();
    }

    async getTopTracks(nTracks) {
        return (await this.fetchWebApi(`v1/me/top/tracks?time_range=long_term&limit=${nTracks}`, "GET")).items;
    }


}