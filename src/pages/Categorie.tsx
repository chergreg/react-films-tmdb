import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchMoviesByGenre, fetchGenres } from '../api/tmdb';
import type { TMDBMovieListItem } from '../types/TMDBMovieListItem';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import './Categorie.css';
import { Container, Spinner, Alert, Pagination } from 'react-bootstrap';

const Categorie: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') ?? '1', 10);

  const [movies, setMovies] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [genreName, setGenreName] = useState<string | null>(null);

  // Récupère les films de la catégorie (page)
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

  // Récupère le nom du genre
  useEffect(() => {
    if (!genreId) return;
    fetchGenres()
      .then(genres => {
        const found = genres.find(g => String(g.id) === String(genreId));
        setGenreName(found?.name ?? `#${genreId}`);
      })
      .catch(() => setGenreName(`#${genreId}`));
  }, [genreId]);

  const goToPage = (p: number) => {
    setSearchParams({ page: String(p) });
  };

  // Pagination Google
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
    <div style={{ background: "#17181f", minHeight: "100vh", paddingBottom: 50 }}>
      <h2 className="demo-title" style={{ marginTop: 30 }}>Catégorie : {genreName ?? genreId}</h2>
      <p className="mb-3 text-end" style={{ marginRight: 20 }}>
        {totalResults} films trouvés — page {pageFromUrl} sur {totalPages}
      </p>

      {/* Section 1 : Swiper Card Slider */}
      <div className="swiper-container-fix">
        <Swiper
          effect="cards"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          modules={[EffectCards]}
          className="categorie-swiper"
        >
          {movies
            .filter(m => m.backdrop_path)
            .slice(0, 12) // max 12 slides pour garder un slider concis
            .map((film, idx) => (
            <SwiperSlide key={film.id}>
              <div
                className="slide-bg"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${film.backdrop_path})`,
                }}
              />
              <div className="slide-content">
                <div className="slide-title">{film.title}</div>
                <div className="slide-year">{film.release_date?.slice(0, 4) || "?"}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Section 2 : Grille de films */}
      <div className="grid-section">
        <div className="film-grid">
          {movies.map((film, idx) => (
            <div className="film-card" key={film.id}>
              <Link to={`/film/${film.id}`}>
                <img
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/w342${film.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={film.title}
                />
                <div className="title">{film.title}</div>
                <div className="year">{film.release_date?.slice(0, 4) || "?"}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default Categorie;
