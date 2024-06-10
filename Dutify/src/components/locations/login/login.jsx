import { BsSpotify } from "react-icons/bs";
import "./login.css";
import { PageHandlerContext } from "../../../App";
import { useContext } from "react";
import { useEffect } from "react";
import { getAccessToken, setAccessToken } from "../../../spotifyApi/SpotifyApiCalls";

function Login(loginUrl) {

  const setPage = useContext(PageHandlerContext).setPage;

  useEffect(() => {
    console.log(location.href.length)
    console.log(location.href.length > 25)
    if(location.href.length > 50){
      let spotifyToken;

      spotifyToken = getTokenFromUrl().access_token;
      window.sessionStorage.setItem("token", spotifyToken);
      setAccessToken(spotifyToken);
      window.sessionStorage.setItem("page", "/inicio")
      console.log("AAAA")
      location.href="Dutify/#inicio"
    } 
  })

  const getTokenFromUrl = () => {
    let location = window.location; 
    return location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

    const goToLoginUrl = () =>{
        
        window.location.href = loginUrl.loginUrl;
    }
  return (
    <section className="login-section d-flex flex-column align-items-center justify-content-center h-100 w-100 gap-5">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="title">Dutify</h1>
        <BsSpotify size={220}></BsSpotify>
      </div>
      <button className="btn-login" onClick={goToLoginUrl}>Iniciar Sesión con Spotify</button>
    </section>
  );
}

export default Login;
