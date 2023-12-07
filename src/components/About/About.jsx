import { Card, Col, Row } from 'react-bootstrap';
import styles from './About.module.css'; 
import CardTeam from './CardTeam/CardTeam';
import Logo from'../../Images/Logo.jpg';

function About() {
   // Datos de ejemplo para los miembros del equipo
   const teamMembers = [
    {
      id: 1,
      name: 'Maria Angelica Palomino Jaramillo',
      image: 'https://media.licdn.com/dms/image/D4E03AQGtPUQXcJYRHQ/profile-displayphoto-shrink_800_800/0/1695143059043?e=1707350400&v=beta&t=FRfVlj7cyXD8I0Squ_hA3sgG-ohPEtIpGTjBhhcDD0Q',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/mar%C3%ADa-ang%C3%A9lica-palomino-jaramillo/',
      github: 'https://github.com/mangelicapj',
    },
    {
      id: 2,
      name: 'María Sol Escobares',
      image: 'https://media.licdn.com/dms/image/D4D35AQHjOlIOL12xtg/profile-framedphoto-shrink_400_400/0/1691017357387?e=1702580400&v=beta&t=RZh79CljXweAH3lesTUDjmRcUCoHT8QKSRcYVMTriDA',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/escobares-maria-sol-14b588216/',
      github: 'https://github.com/Sunny1606',
    },
    {
      id: 3,
      name: 'Renato Galizzi',
      image: 'https://media.licdn.com/dms/image/D4E03AQEy22novnnFZQ/profile-displayphoto-shrink_400_400/0/1678133667640?e=1707350400&v=beta&t=4ESk0fHBsQ-VUdfWWvP_pKbrPa-_NmrPl-KNlDGMmx8',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/renato-galizzi-07b92b33/',
      github: 'https://github.com/renatogalizzi',
    },
    {
      id: 4,
      name: 'Luca Vincenzo Bruzzone Castillo',
      image: 'https://avatars.githubusercontent.com/u/133311620?v=4',
      description: 'Full Stack Developer/ Front-End Developer at SportVibe',
      linkedin: 'https://www.linkedin.com/in/luca-bruzzone-6152b6278/',
      github: 'https://github.com/lucabruzzone',
    },
  ];

  return (
    <div className={styles.aboutContainer}>
      
      <Card className={styles.companyCard}>
        <Row className="g-0">
          <Col md={4}>
            <Card.Img variant="top" src={Logo}  alt="Logo" className={`${styles.logo} img-fluid rounded-start`} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>SportVibe E-Commerce</Card.Title>
              <Card.Text>
                La e-commerce SportVibe es una tienda de ropa deportiva creada como parte del proyecto final en Soy Henry.
                Con despliegue eficiente, autorización segura, pasarela de pagos y notificaciones por correo o Socket.io.
                Nuestra e-commerce incluye filtros combinados, Cloudinary para imágenes y revisiones con puntuaciones.
                El Dashboard Admin facilita la gestión de productos y estadísticas. Desde categorías y ofertas hasta tallas disponibles,
                SportVibe fusiona estilo y funcionalidad. Experimenta la emoción deportiva con una interfaz intuitiva y procesamiento de pagos eficiente.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Row xs={1} md={2} lg={3} className={styles.teamCardsContainer}>
        {teamMembers.map((member) => (
          <Col key={member.id}>
            <CardTeam {...member} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default About;
