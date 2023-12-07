import { Card } from 'react-bootstrap';
import styles from './CardTeam.module.css';

function CardTeam({ name, image, description, linkedin, github }) {
  return (
    <Card className={`${styles.teamCard} card`}>
      <div className={styles.imageContainer}>
        <Card.Img variant="top" src={image} alt={`Foto de ${name}`} className={styles.memberImage} />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a href={linkedin} className="card-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li className="list-group-item">
          <a href={github} className="card-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
      </ul>
    </Card>
  );
}

export default CardTeam;
