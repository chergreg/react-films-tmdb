import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api/tmdb';
import type { TMDBMovieListItem } from '../types/TMDBMovieListItem';
import { Container, Row, Col, Card, Spinner, Alert, Form, Pagination } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

const Recherche: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialPage = parseInt(searchParams.get('page') ?? '1', 10);

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Update URL on search
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query, page: String(page) });
    }
  }, [query, page, setSearchParams]);

  // Fetch when query or page changes
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalPages(1);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    setError(null);
    searchMovies(query, page)
      .then(res => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
        setTotalResults(res.total_results);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({ q: query, page: '1' });
  };

  const goToPage = (p: number) => setPage(p);

  // Pagination à la Google (facultatif, sinon <Pagination.Prev/Next>)
  const paginationItems = [];
  const maxButtons = 7;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, page + half);
  if (end - start < maxButtons - 1) {
    if (start === 1) end = Math.min(totalPages, start + maxButtons - 1);
    else if (end === totalPages) start = Math.max(1, end - maxButtons + 1);
  }
  if (start > 1) {
    paginationItems.push(
      <Pagination.Item key={1} onClick={() => goToPage(1)}>1</Pagination.Item>
    );
    if (start > 2) paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
  }
  for (let i = start; i <= end; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === page} onClick={() => goToPage(i)}>{i}</Pagination.Item>
    );
  }
  if (end < totalPages) {
    if (end < totalPages - 1) paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    paginationItems.push(
      <Pagination.Item key={totalPages} onClick={() => goToPage(totalPages)}>{totalPages}</Pagination.Item>
    );
  }

  return (
    <Container className="py-5">
      <h2>Recherche de films</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Titre du film…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            size="lg"
          />
        </Form.Group>
      </Form>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <div>Recherche en cours…</div>
        </div>
      )}
      {error && (
        <Alert variant="danger">{error}</Alert>
      )}
      {!loading && !error && query.trim() && (
        <>
          <div className="mb-3 text-end">
            {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''} — page {page} sur {totalPages}
          </div>
          <Row>
            {movies.length === 0 ? (
              <Col>
                <Alert variant="info">Aucun film trouvé.</Alert>
              </Col>
            ) : (
              movies.map(movie => (
                <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
                  <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={movie.poster_path
                          ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                          : '/placeholder.jpg'}
                        alt={movie.title}
                      />
                      <Card.Body>
                        <strong>{movie.title}</strong>
                        <br />
                        <small className="text-muted">{movie.release_date}</small>
                        <div>Note : {movie.vote_average}</div>
                        <div className="mt-2" style={{ fontSize: '0.85em', color: '#444' }}>
                          {movie.overview.slice(0, 80)}...
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            )}
          </Row>
          {totalPages > 1 && (
            <div className="my-4">
              <Pagination className="justify-content-center align-items-center">
                <Pagination.Prev
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                />
                {paginationItems}
                <Pagination.Next
                  disabled={page >= totalPages}
                  onClick={() => goToPage(page + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Recherche;
