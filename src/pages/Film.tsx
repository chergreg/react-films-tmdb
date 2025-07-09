import React from 'react';
import { useParams } from 'react-router-dom';

const Film: React.FC = () => {
  // Récupère l'id depuis l'URL (/film/:id)
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Fiche Film</h1>
      <p>ID du film : <strong>{id}</strong></p>
    </div>
  );
};

export default Film;
