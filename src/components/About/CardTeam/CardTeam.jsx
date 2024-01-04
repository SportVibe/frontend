import { Card } from 'react-bootstrap';
import styles from './CardTeam.module.css';

function CardTeam({ name, image, description, linkedin, github }) {
  return (
    <Card className={styles.teamCard}>
      <div className={styles.imageContainer}>
        <Card.Img variant="top" src={image} alt={`Foto de ${name}`} />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Body className={styles.socialLinks}>
        <Card.Link className="text-decoration-none" href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Card.Link>
        <Card.Link className="text-decoration-none" href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CardTeam;