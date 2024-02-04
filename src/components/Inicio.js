import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Inicio() {
  const [dataUsuarios, setDataUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3500/api/mostrarusuarios")
      .then((respuesta) => {
        console.log(respuesta);
        setDataUsuarios(respuesta.data); // Asumo que los datos están en el campo "data" de la respuesta
      })
      .catch((err) => {
        console.log("Error al recuperar el API" + err);
      });
  }, []);

  const listaUsuarios = dataUsuarios.map((usuario) => {
    var Editar = "/Editar/"+usuario.editar;
    var borrar = "/Borrar" +usuario.borrar;
    const foto = "https://localhost:3000/images" + usuario.foto;
    return (
      <tr key={usuario.id}>
        <td>{usuario.id}</td>
        <td>{usuario.nombre}</td>
        <td>{usuario.usuario}</td>
        <td><img src={foto} width="100px" alt={`Foto de ${usuario.nombre}`} /></td>
        <td>
            <Link to = {Editar}>Editar</Link>
            <Link to={borrar}>Borrar</Link>
        </td>
      </tr>
    );
  });

  return (
    <div class = "container mt 5">
    <div class ="container">
      <div class="card">
        <div class="card-header">
          <h1>API Usuarios</h1>
        </div>
        <div class = "card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Foto</th>
                <th>Editar/Borrar</th>
              </tr>
            </thead>
            <tbody>{listaUsuarios}</tbody>
            </table>
        </div>
      </div>
      <div class ="card-footer"></div>
    </div>
  </div>
  );
}
