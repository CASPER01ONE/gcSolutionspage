// src/pages/Quotes.jsx - Para citas/cotizaciones
import { useState } from 'react';
import api from '../api/client';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

function Quotes() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // En la función handleSubmit o similar
async function handleSubmit(e) {
  e.preventDefault();
  try {
    await api.post('/quotes', formData, {
      headers: {
        'Content-Type': 'application/json',
        // Agrega auth si es necesario: 'Authorization': `Bearer ${token}`
      }
    });
    // Manejo de éxito (e.g., mostrar mensaje)
    setSuccess(true);
    setError(null);
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
  console.error('Error al enviar cotización:', error);
  if (error.response) {
    console.log('Status:', error.response.status);  // 404
    console.log('Detalles del error del servidor:', error.response.data);  // Muestra el HTML o JSON
    if (error.response.status === 404) {
      // Muestra al usuario: "Ruta no encontrada - verifica el backend"
    }
  }
}
}

  return (
    <Container>
      <h1>Cotizaciones</h1>
      {success && <Alert variant="success">Cotización enviada con éxito.</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="message">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
    </Container>
  );
}

export default Quotes;