import { BsSpotify } from "react-icons/bs";
import "./login.css";

function Login(loginUrl) {
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
