import React from "react";
import { useParams, Link } from "react-router-dom";
import { useActorDetails } from "../hooks/useActorDetails";
import { Container, Row, Col, Spinner, Alert, Badge, Card } from "react-bootstrap";

const Acteur: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { actor, loading, error } = useActorDetails(id);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <div>Chargement de l'acteur...</div>
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  if (!actor) return null;

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              src={actor.profileUrl ?? "/profile_placeholder.png"}
              alt={actor.name}
              style={{ aspectRatio: "2/3", objectFit: "cover" }}
            />
            <Card.Body>
              <h3>{actor.name}</h3>
              <div>
                {actor.gender !== "Inconnu" && (
                  <Badge bg="secondary" className="me-2">{actor.gender}</Badge>
                )}
                {actor.birthday && (
                  <Badge bg="info" className="me-2">Né·e {actor.birthday}</Badge>
                )}
                {actor.deathday && (
                  <Badge bg="danger" className="me-2">Décédé·e {actor.deathday}</Badge>
                )}
              </div>
              {actor.placeOfBirth && <div className="mt-2"><strong>Lieu de naissance :</strong> {actor.placeOfBirth}</div>}
              <div className="mt-2">
                <span>Popularité : {actor.popularity}</span>
              </div>
              <div className="mt-2">
                {actor.imdbUrl && (
                  <a href={actor.imdbUrl} target="_blank" rel="noopener noreferrer">
                    IMDb
                  </a>
                )}
                {actor.homepage && (
                  <span>
                    {" | "}
                    <a href={actor.homepage} target="_blank" rel="noopener noreferrer">
                      Site officiel
                    </a>
                  </span>
                )}
              </div>
              {actor.alsoKnownAs.length > 0 && (
                <div className="mt-2">
                  <strong>Aussi connu·e sous :</strong>
                  <ul>
                    {actor.alsoKnownAs.map((aka, i) => (
                      <li key={i}>{aka}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h4>Biographie</h4>
          <p>{actor.biography ?? "Aucune biographie."}</p>
          <h4 className="mt-4">Filmographie principale</h4>
          <Row>
            {actor.filmography.slice(0, 20).map((film) => (
              <Col key={film.id} xs={6} md={4} lg={3} className="mb-4">
                <Link to={`/film/${film.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Card className="film-card h-100">
                    <Card.Img
                      src={film.posterUrl ?? "/placeholder.jpg"}
                      alt={film.title}
                      style={{ aspectRatio: "2/3", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <strong>{film.title}</strong>
                      <br />
                      <small className="text-muted">{film.character}</small>
                      <div className="mt-2">
                        <span>{film.releaseYear}</span> &middot; <span>{film.voteAverage}/10</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Acteur;
