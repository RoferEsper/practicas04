import { Table, Button } from "react-bootstrap";
import "../CSS/Main.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_CLIENTES } from "../Constants/endpoints";
import { Link } from "react-router-dom";

const Main = () => {
  const [datos, setDatos] = useState([]);

  const getClientes = async () => {
    try {
      const response = await axios.get(URL_CLIENTES);
      setDatos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const Borrar = async (id) => {
    try {
      if (confirm("¿Estás seguro de que querés eliminar este cliente?")) {
        await axios.delete(`${URL_CLIENTES}/${id}`);
        getClientes(); // Actualiza la lista de clientes después de eliminar
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  return (
    <>
      <h1>Clientes</h1>
      {/* <Link to='/view' className="btn btn-primary">Ver Clientes</Link> */}

      <div className="containerMain">
        <Link to="/crearCliente" className="btn btn-success">
          Crear Cliente
        </Link>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
            </tr>
          </thead>

          {datos.map((cliente) => (
            <tbody key={cliente.id}>
              <tr>
                <td>{cliente.nombre}</td>
                <td>{cliente.dni}</td>
                <td>{cliente.email}</td>

                <td>
                  <Link
                    to={`/editarCliente/${cliente.id}`}
                    className="btn btn-primary"
                  >
                    Editar
                  </Link>
                  <Link
                    to={`/verCliente/${cliente.id}`}
                    className="btn btn-danger"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => {
                      Borrar(cliente.id);
                    }}
                    className="btn btn-success"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </>
  );
};

export default Main;
