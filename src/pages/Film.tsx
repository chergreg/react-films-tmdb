import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { Container, Row, Col, Spinner, Alert, Card, Badge } from 'react-bootstrap';

const Film: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movieDetails, loading, error } = useMovieDetails(id);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Chargement du film...</div>
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

  if (!movieDetails) return null;

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img src={movieDetails.posterUrl ?? '/placeholder.jpg'} alt={movieDetails.title} />
          </Card>
          {movieDetails.streamingProviders.length > 0 && (
            <Card className="mt-3">
              <Card.Body>
                <h5>Disponible sur :</h5>
                <div>
                  {movieDetails.streamingProviders.map(p => (
                    <img
                      key={p.name}
                      src={p.logoUrl}
                      alt={p.name}
                      title={p.name}
                      style={{ height: 32, marginRight: 8 }}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={8}>
          <h2>{movieDetails.title} <small>({movieDetails.originalTitle})</small></h2>
          {movieDetails.tagline && <p className="fst-italic">{movieDetails.tagline}</p>}
          <div className="mb-2">
            <Badge bg="info" className="me-2">{movieDetails.releaseDate}</Badge>
            <Badge bg="secondary" className="me-2">{movieDetails.runtime} min</Badge>
            <Badge bg="warning" className="me-2">{movieDetails.voteAverage} / 10</Badge>
            <div className="mb-2">
              {/* autres badges (date, durée, note, etc.) */}
              {movieDetails.genres.map(g => (
                <Link
                  key={g.id}
                  to={`/categorie/${g.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Badge bg="light" text="dark" className="me-1" style={{ cursor: 'pointer' }}>
                    {g.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <p>{movieDetails.overview}</p>
          <ul>
            <li><strong>Pays :</strong> {movieDetails.productionCountries.join(', ')}</li>
            <li><strong>Langue originale :</strong> {movieDetails.originalLanguage}</li>
            <li><strong>Budget :</strong> {movieDetails.budget.toLocaleString()} $</li>
            <li><strong>Recette :</strong> {movieDetails.revenue.toLocaleString()} $</li>
            <li><strong>Réalisateur :</strong> {movieDetails.director?.name ?? 'Inconnu'}</li>
            {movieDetails.homepage && (
              <li>
                <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">
                  Site officiel
                </a>
              </li>
            )}
            {movieDetails.imdbUrl && (
              <li>
                <a href={movieDetails.imdbUrl} target="_blank" rel="noopener noreferrer">
                  IMDb
                </a>
              </li>
            )}
          </ul>

          <h5>Casting principal</h5>
          <Row>
            {movieDetails.cast.map(actor => (
              <Col key={actor.id} xs={6} md={4} lg={3} className="mb-3">
                <Link to={`/acteur/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={actor.photoUrl ?? '/profile_placeholder.png'}
                      alt={actor.name}
                    />
                    <Card.Body>
                      <strong>{actor.name}</strong>
                      <br />
                      <small className="text-muted">{actor.character}</small>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {movieDetails.trailerYoutubeId && (
            <div className="my-4">
              <h5>Bande-annonce</h5>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  title="Bande-annonce"
                  src={`https://www.youtube.com/embed/${movieDetails.trailerYoutubeId}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Film;
