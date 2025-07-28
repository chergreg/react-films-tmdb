import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { TMDBMovieListItem } from '../types/TMDBMovieListItem';

interface FilmCardProps {
  movie: TMDBMovieListItem;
  to?: string;             // URL cible au clic, optionnelle
  size?: 'sm' | 'md' | 'lg'; // Taille de la carte, optionnelle
  showOverview?: boolean;  // Afficher ou non le résumé
  children?: React.ReactNode; // Pour insérer du contenu additionnel
}

const FilmCard: React.FC<FilmCardProps> = ({
  movie,
  to = `/film/${movie.id}`,
  size = 'md',
  showOverview = true,
  children,
}) => {
  // Gestion des tailles (exemple simple, tu peux étoffer)
  let cardWidth = '100%';
  if (size === 'sm') cardWidth = '12rem';
  if (size === 'md') cardWidth = '16rem';
  if (size === 'lg') cardWidth = '22rem';

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="h-100 shadow-sm" style={{ width: cardWidth, margin: 'auto' }}>
        <Card.Img
          variant="top"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : '/placeholder.jpg'
          }
          alt={movie.title}
        />
        <Card.Body>
          <strong>{movie.title}</strong>
          <br />
          <small className="text-muted">{movie.release_date}</small>
          <div>Note : {movie.vote_average}</div>
          {showOverview && (
            <div className="mt-2" style={{ fontSize: '0.85em', color: '#444' }}>
              {movie.overview?.slice(0, 80)}...
            </div>
          )}
          {children /* Pour ajouter du contenu custom */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default FilmCard;
