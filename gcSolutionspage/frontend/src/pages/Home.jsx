// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '../api/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const [homeData, setHomeData] = useState({ message: '', featured: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/home')
      .then(response => {
        setHomeData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar datos de home:', error);
        setError('No se pudieron cargar los datos. Intenta de nuevo.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Container fluid className="section"><p>Cargando...</p></Container>;
  }

  if (error) {
    return <Container fluid className="section"><p>{error}</p></Container>;
  }

  return (
    <Container fluid className="section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="hero-carousel"
      >
        <SwiperSlide>
          <div className="hero-slide hero-slide-1" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}insurance1.jpg)` }}>
            <h1>GC Solutions: Tu Protección Financiera</h1>
            <p>{homeData.featured || 'Seguros patrimoniales, gastos médicos y becas educativas.'}</p>
            <Button as={Link} to="/services" variant="primary">Ver Servicios</Button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero-slide hero-slide-2" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}insurance1.jpg)` }}>
            <h1>Planes Adaptados a Tus Necesidades</h1>
            <p>Protege tu futuro con nuestros planes personalizados.</p>
            <Button as={Link} to="/services" variant="primary">Explorar</Button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero-slide hero-slide-3" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}insurance1.jpg)` }}>
            <h1>Asegura los estudios de tus hijos</h1>
            <p>Haz realidad esos sueños comienza ahora.</p>
            <Button as={Link} to="/services" variant="primary">Explorar</Button>
          </div>
        </SwiperSlide>
      </Swiper>
      <Row className="mt-5">
        <Col>
          <h2>{homeData.message || 'Bienvenido a GC Solutions'}</h2>
          <p>Especialistas en seguros patrimoniales, gastos médicos y becas educativas, adaptados a tu nicho de mercado.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;