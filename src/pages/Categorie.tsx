import React from 'react';
import { useParams } from 'react-router-dom';

const Categorie: React.FC = () => {
  // Récupère le genreId depuis l'URL (/categorie/:genreId)
  const { genreId } = useParams<{ genreId: string }>();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Catégorie</h1>
      <p>ID du genre : <strong>{genreId}</strong></p>
    </div>
  );
};

export default Categorie;
