import {Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { URL_CLIENTES } from '../../Constants/endpoints';
import { useParams, useNavigate} from 'react-router-dom';

import {HOME} from '../../Routers/router';




const EditTable = () => {

const {id} = useParams();
const navigate = useNavigate();
const [datos, setDatos] = useState({});

//-----------------------------------------------------------
const getCliente = async () => {
  try {
    const response = await axios.get(`${URL_CLIENTES}/${id}`);
    setDatos(response.data);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
  }
};

useEffect(() => {
  getCliente();
}, []);



//-----------------------------------------------------------------
const handleChange = (e) => {
  setDatos({ ...datos, [e.target.name]: e.target.value });
}
//-----------------------------------------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`${URL_CLIENTES}/${id}`, datos);
    setDatos(response.data);
    if (response) {
      navigate(HOME);
    }
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
  }

}
//-----------------------------------------------------------------------------

  return (
    <div>
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={datos.nombre || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            type="text"
            className="form-control"
            name="dni"
            value={datos.dni || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={datos.email || ''}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant="primary">Guardar Cambios</Button>
        <Button variant="secondary" onClick={() => navigate(HOME)}>Cancelar</Button>
      </form>


    </div>
  )
}

export default EditTable