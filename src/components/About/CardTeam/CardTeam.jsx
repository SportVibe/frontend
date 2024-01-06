import { Card } from "react-bootstrap";
import styles from "./CardTeam.module.css";

function CardTeam({ name, image, description, linkedin, github }) {
  return (
    <Card
      style={{
        width: "22rem",
        height: "100%",
        margin: "30px",
        overflow: "hidden",
      }}
    >
      <div className={styles.imageContainer}>
        <Card.Img src={image} alt={`Foto de ${name}`} />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ul className={`list-group ${styles.listGroupItem}`}>
        <li className="list-group-item">
          <a
            href={linkedin}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li className="list-group-item">
          <a
            href={github}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </Card>
  );
}

export default CardTeam;
