import React from 'react';
import { useParams } from 'react-router-dom';

const Acteur: React.FC = () => {
  // Récupère l'id de l'acteur depuis l'URL (/acteur/:id)
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Fiche Acteur</h1>
      <p>ID de l'acteur : <strong>{id}</strong></p>
    </div>
  );
};

export default Acteur;
