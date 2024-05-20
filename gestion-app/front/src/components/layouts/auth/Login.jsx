import { useState, useEffect } from "react";
//import { usuarios } from "../../database/dataBase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";
let urlUsuarios = "http://localhost:3000/user";
//import

const Login = () => {
  const [getUsuario, setUsuario] = useState("");
  const [getContrasena, setContrasena] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const redireccion = useNavigate();
  async function getUsuarios() {
    let resultado = await axios.get(urlUsuarios);
    console.log(resultado.data);
    setUsuarios(resultado.data);
  }
  //vamos (hoy 2005)
  function validarInicioSesion() {
    if (buscarUsuario()) {
      //console.log("Inicio de sesión correcta");
      //redireccion("/home"); agrego desde login reciclo codigo
      Swal.fire({
        title: "Bienvenido...",
        text: "Acceso al sistema, será redireccionado",
        icon: "success",
      });
      redireccion("/home");
    } else {
      //console.log("Error de credenciales"); agrego desde login reciclo codigo
      Swal.fire({
        title: "Error",
        text: "Usuario y/contraseña incorrecto",
        icon: "error",
      });
    }
  }
  useEffect(() => {
    getUsuarios();
  }, []);
  function buscarUsuario() {
    return usuarios.some(
      (usuario) =>
        usuario.user === getUsuario && usuario.contrasena === getContrasena
    );
  }
  return (
    <form>
      <div className="container fadeInAnimation">
        <h2>Iniciar Sesión</h2>
        <div className="input-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setContrasena(e.target.value);
            }}
          />
        </div>
        <section className="botones">
          <button onClick={validarInicioSesion} type="button" className="btn">
            Iniciar Sesión
          </button>
          <Link to="/registro" type="button" className="btn">
            Crear Cuenta
          </Link>
        </section>
      </div>
    </form>
  );
};
export default Login;
