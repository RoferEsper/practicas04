import Header from '../Components/Header'
import { Table, Card, Button } from 'react-bootstrap'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { URL_CLIENTES } from '../Constants/endpoints';
import { useParams } from 'react-router-dom';


const ViewPage = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const getCliente = async () => {
      try {
        const response = await axios.get(`${URL_CLIENTES}/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };
    getCliente();
  }, [id]);

  //-----------------------------------------------------------------



  return (

    <div>
      <Header />
      <br />
      <br />
      <br />

      <Card>
        <Card.Body>
          <Card.Title>Información del Cliente</Card.Title>
          <Card.Text>
            <strong>Nombre:</strong> {cliente.nombre} <br />
            <strong>DNI:</strong> {cliente.dni} <br />
            <strong>Email:</strong> {cliente.email}
          </Card.Text>
        </Card.Body>
      </Card>

      <br />
      <Button variant="primary" href="/home">
        Volver a la lista de clientes
      </Button>
    </div>
    
  )
}

export default ViewPage