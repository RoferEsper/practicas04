import  {  useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap'
import axios from 'axios'
import { URL_CLIENTES } from '../../Constants/endpoints'
import { useNavigate } from 'react-router-dom'




const ClientsTable = () => {

const navigate = useNavigate()

const initialState = {
 
  nombre: '',
  dni: '',
  email: ''
}

const [cliente, setCliente] = useState(initialState);

const handleChange = (e) =>{
  setCliente({ ...cliente, [e.target.name]: e.target.value});
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    const response = await axios.post(URL_CLIENTES, cliente);
     setCliente(response.data);

    
    setCliente(initialState);   // aqui limpiamos los datos del formulario, para ello debemos tener el value 
    if (response) {
     navigate('/home'); // Redirige a la página principal o a donde desees después de crear el cliente
    console.log("Cliente creado exitosamente:", response.data);
    
    }
    
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    
  }
}




  return (
    <div>
        <h2>creacion de cliente</h2>

<div>
 <Container className="mt-5">
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="ingresa tu nombre" value={cliente.nombre}  name='nombre' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>DNI</Form.Label>
        <Form.Control type="text" placeholder="ingresa tu dni" name='dni' value={cliente.dni}  onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="ingresa tu Email" name='email' value={cliente.email} onChange={handleChange}/>
      </Form.Group>
    <Button variant="primary" type="submit">
      Guardar
    </Button>
    </Form>
    <br />
  
 </Container>
</div>

        
    </div>
  )
}

export default ClientsTable