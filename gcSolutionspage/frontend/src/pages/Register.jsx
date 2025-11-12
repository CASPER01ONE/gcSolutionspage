// src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username: formData.username, email: formData.email, password: formData.password };
    console.log('Enviando:', data);
    if (!data.username || !data.email || !data.password) {
      setError('Faltan campos requeridos');
      return;
    }
    axios.post('/api/auth/register', data)
      .then(() => setSuccess(true))
      .catch(err => setError('Error: ' + err.response?.data?.message || 'Bad Request'));
  };

  return (
    <Container fluid className="register-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="register-card">
            <Card.Body>
              <div className="text-center mb-4">
                <img src="/assets/logo.png" alt="GC Solutions" className="login-logo" />
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">¡Registro exitoso!</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre de usuario"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 register-button">
                  Registrarse
                </Button>
              </Form>
              <p className="register-link">
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;