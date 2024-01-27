import { Card, Col, Row } from 'react-bootstrap';
import styles from './About.module.css';
import CardTeam from './CardTeam/CardTeam';
import CardTeam2 from './CardTeam2/CardTeam2';
import Brian from '../../Images/Brian.jpg';
import Daniel from '../../Images/Daniel.jpg';

function About() {
  // Datos de ejemplo para los miembros del equipo
  const teamMembers = [
    {
      id: 1,
      name: 'Maria Angelica Palomino Jaramillo',
      image: 'https://avatars.githubusercontent.com/u/128256723?v=4',
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/mar%C3%ADa-ang%C3%A9lica-palomino-jaramillo/',
      github: 'https://github.com/mangelicapj',
    },
    {
      id: 2,
      name: 'María Sol Escobares',
      image: 'https://res.cloudinary.com/drrswxx5y/image/upload/v1705543149/AboutSol_htq3l5.png',
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/escobares-maria-sol-14b588216/',
      github: 'https://github.com/Sunny1606',
    },
    {
      id: 3,
      name: 'Renato Galizzi',
      image: 'https://avatars.githubusercontent.com/u/123226344?v=4',
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/renato-galizzi-07b92b33/',
      github: 'https://github.com/renatogalizzi',
    },
    {
      id: 4,
      name: 'Luca Vincenzo Bruzzone Castillo',
      image: 'https://avatars.githubusercontent.com/u/133311620?v=4',
      banner: 'https://media.licdn.com/dms/image/D4E16AQFJdlKp2Q5v7Q/profile-displaybackgroundimage-shrink_350_1400/0/1706311638033?e=1711584000&v=beta&t=VHlO3lT78BXFzqP_06f62zcCHaqymRUj9abZQ_v4724',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/luca-bruzzone-6152b6278/',
      github: 'https://github.com/lucabruzzone',
    },
    {
      id: 5,
      name: 'Brian Hernan Rojas',
      image: Brian,
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Back-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/brian-rojas-74a174278/',
      github: 'https://github.com/BrianHerR',
    },
    {
      id: 6,
      name: 'Mariano Antonio Vijarra',
      image: 'https://avatars.githubusercontent.com/u/121908120?v=4',
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Back-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/mariano-vijarra/',
      github: 'https://github.com/VijarraM',
    },
    {
      id: 7,
      name: 'Kerly Yohana Gomez Giraldo',
      image: 'https://avatars.githubusercontent.com/u/129567578?v=4',
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/kerly-yohana-gomez-giraldo-65a124276/',
      github: 'https://github.com/KyohanaGomez',
    },
    {
      id: 8,
      name: 'Daniel Enoc Amaya Amaya',
      image: Daniel,
      banner: 'https://media.licdn.com/dms/image/D4E16AQFu0Fl-BB0t3Q/profile-displaybackgroundimage-shrink_350_1400/0/1699049023012?e=1711584000&v=beta&t=67TvenofJBr9utHTO5qgu2Qls4yOwys0h-hk3Dvn_LM',
      description: 'Full Stack Developer/ Back-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/daniel-enoc-amaya-amaya/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/danielamaya1908',
    },
  ];

  return (
    <div className={styles.aboutContainer}>
      <Card className={styles.companyCard}>
        <Row className="g-0">
          <Col md={8} className="mx-auto">
            <Card.Body className={styles.textContainer}>
              <Card.Title className={styles.text}>¡SportVibe: Siente la energía, viste la pasión!</Card.Title>
              <Card.Text className={styles.text}>
                La e-commerce SportVibe es una tienda de ropa deportiva creada como parte del proyecto final en Soy Henry.
                Con despliegue eficiente, autorización segura, pasarela de pagos y notificaciones por correo.
                Nuestra e-commerce incluye filtros combinados, Cloudinary para imágenes y revisiones con puntuaciones.
                El Dashboard Admin facilita la gestión de productos y estadísticas. Desde categorías y ofertas hasta tallas disponibles,
                SportVibe fusiona estilo y funcionalidad. Experimenta la emoción deportiva con una interfaz intuitiva y procesamiento de pagos eficiente.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* <Row xs={1} md={2} lg={4} className='d-flex justify-content-center'>
        {teamMembers.map((member) => (
          <Col key={member.id} xs={12} md={6} lg={3}>
            <CardTeam {...member} />
          </Col>
        ))}
      </Row> */}
      <p className={styles.teamTitle}>Equipo SportVibe</p>
      <div className={styles.cardSection}>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles.cardContainer}>
            <CardTeam2 {...member} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;