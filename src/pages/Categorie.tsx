import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchMoviesByGenre } from '../api/tmdb';
import type { TMDBMovieListItem } from '../types/TMDBMovieListItem';
import { Container, Row, Col, Card, Spinner, Alert, Pagination } from 'react-bootstrap';
import FilmCard from '../components/FilmCard';

const Categorie: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') ?? '1', 10);

  const [movies, setMovies] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!genreId) return;
    setLoading(true);
    setError(null);
    fetchMoviesByGenre(genreId, pageFromUrl)
      .then(response => {
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setTotalResults(response.total_results);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [genreId, pageFromUrl]);

  const goToPage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  // Pagination à la Google
  const paginationItems = [];
  const maxButtons = 7;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, pageFromUrl - half);
  let end = Math.min(totalPages, pageFromUrl + half);

  if (end - start < maxButtons - 1) {
    if (start === 1) {
      end = Math.min(totalPages, start + maxButtons - 1);
    } else if (end === totalPages) {
      start = Math.max(1, end - maxButtons + 1);
    }
  }

  if (start > 1) {
    paginationItems.push(
      <Pagination.Item key={1} onClick={() => goToPage(1)}>{1}</Pagination.Item>
    );
    if (start > 2) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }
  }

  for (let i = start; i <= end; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === pageFromUrl}
        onClick={() => goToPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }
    paginationItems.push(
      <Pagination.Item key={totalPages} onClick={() => goToPage(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Chargement des films...</div>
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

  return (
    <Container className="py-5">
      <h2>Films de la catégorie {genreId}</h2>
      <p className="mb-3 text-end">
        {totalResults} films trouvés — page {pageFromUrl} sur {totalPages}
      </p>
      <Row>
        {movies.length === 0 ? (
          <Col>
            <Alert variant="info">Aucun film trouvé.</Alert>
          </Col>
        ) : (
          movies.map(movie => (
            <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
              <FilmCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
      {totalPages > 1 && (
        <div className="my-4">
          <Pagination className="justify-content-center align-items-center">
            <Pagination.Prev
              disabled={pageFromUrl <= 1}
              onClick={() => goToPage(pageFromUrl - 1)}
            />
            {paginationItems}
            <Pagination.Next
              disabled={pageFromUrl >= totalPages}
              onClick={() => goToPage(pageFromUrl + 1)}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Categorie;
