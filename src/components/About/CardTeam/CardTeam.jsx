import { Card } from 'react-bootstrap';
import styles from './CardTeam.module.css';

function CardTeam({ name, image, description, linkedin, github }) {
  return (
    <Card className={styles.teamCard}>
      <div className={styles.imageContainer}>
        <Card.Img variant="top" src={image} alt={`Foto de ${name}`} className={styles.memberImage} />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ul className={styles.listGroupItem}>
        <li className={styles.listGroupItem}>
          <a href={linkedin} className="card-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li >
          <a href={github} className="card-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
      </ul>
    </Card>
  );
}

export default CardTeam;