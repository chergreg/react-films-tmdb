import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovie } from '../api/tmdb';
import type { Movie } from '../types/Movie';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';

const Film: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovie(id)
      .then(data => {
        setMovie(data);
        setError(null);
      })
      .catch(err => {
        console.error("Erreur API TMDB :", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

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

  if (!movie) {
    return null;
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
              alt={movie.title}
            />
          </Card>
        </Col>
        <Col md={8}>
          <h2>{movie.title}</h2>
          <p><em>{movie.tagline}</em></p>
          <p>{movie.overview}</p>
          <ul>
            <li><strong>Date de sortie :</strong> {movie.release_date}</li>
            <li><strong>Durée :</strong> {movie.runtime} min</li>
            <li><strong>Note :</strong> {movie.vote_average} / 10</li>
            <li><strong>Genres :</strong> {movie.genres.map(g => g.name).join(', ')}</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Film;
