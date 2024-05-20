import {useEffect, useState} from "react";
import Header from "../../helpers/Header"
import axios from "axios";
import Swal from "sweetalert2";
let urlUSuarios = "http://localhost:3000/user";

const Home = () => {
  const [usuarios, setUsuarios]= useState ([]);
  const getUsuarios = async () =>{
    let resultado = await axios.get (urlUSuarios);
    console.log(resultado);
    setUsuarios(resultado.data);
  };

useEffect(()=>{
  getUsuarios();
}, []);

function eliminarUsuario(id,user){
//console.log(id);
Swal.fire({
  title: "Estas seguro que desea eliminar el usuario?" + user,
  text: "No se puede reversar esta acción!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, Eliminar!",
}).then((result) => {
  if (result.isConfirmed) {
    confirmar(id);
    Swal.fire({
      title: "Eliminado!",
      text: "El usuario se eliminó correctamente.",
      icon: "success"
    });
  }
});
}

async function confirmar (id){
await axios.detete(urlUSuarios + "/" + id);
getUsuarios();
}

  return (
    <div>
        <Header />
        <section>
            {usuarios.map((usuario) =>(
                <section key={usuario.id}>
                    <p>Usuario: {usuario.user}</p>
                    <input  value ={usuario.contrasena}  type="text" />
                    <p>ID: {usuario.id}</p>
               
                      <section>
                          <button>Editar</button>
                          <button onClick={() => eliminarUsuario(usuario.id,usuario.user )}>
                            Eliminar
                            </button>
                      </section>
                </section>
              ))}
        </section>
    </div>
  );
};

export default Home;