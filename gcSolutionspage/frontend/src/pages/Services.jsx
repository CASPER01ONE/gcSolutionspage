// src/pages/Services.jsx
import { useEffect, useState } from 'react';
import api from '../api/client';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingSample, setUsingSample] = useState(false);

  useEffect(() => {
    api.get('/services')
      .then(res => {
        setServices(res.data);
        const source = res.headers?.['x-data-source'];
        setUsingSample(source === 'sample');
        setLoading(false);
      })
      .catch(async () => {
        try {
          const resp = await fetch(import.meta.env.BASE_URL + 'services.sample.json');
          if (resp.ok) {
            const sample = await resp.json();
            setServices(sample);
            setUsingSample(true);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error(e);
        }
        setError('No se pudieron cargar los servicios.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Container className="section"><p>Cargando servicios...</p></Container>;
  if (error) return <Container className="section"><p>{error}</p></Container>;

  return (
    <Container className="section">
      <h2>Servicios - GC Solutions</h2>
      {usingSample && (
        <div className="alert alert-warning" role="alert" style={{ marginTop: '1rem' }}>
          Mostrando datos de ejemplo mientras se conecta la base de datos.
        </div>
      )}
      <Row>
        {services.length === 0 ? (
          <Col key="no-services"><p>No hay servicios disponibles.</p></Col>
        ) : (
          services.map((service, idx) => (
            <Col md={4} key={service._id || service.name || idx} className="mb-4">
              <Card className="service-card">
                <div
                  className="image-placeholder"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.2)), url(${service.image || import.meta.env.BASE_URL + 'vite.svg'})` }}
                ></div>
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Card.Text><strong>Precio: ${service.price}</strong></Card.Text>
                  <Button variant="primary" as="a" href="/quotes">Solicitar Cotización</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Services;