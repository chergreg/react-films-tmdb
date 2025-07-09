import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>À propos</h1>
      <p>
        Ce projet a été réalisé dans le but de découvrir et d’explorer la création d’applications web modernes avec React et TypeScript.<br />
        Il utilise l’API TMDB pour fournir des informations toujours à jour sur les films et les acteurs.
      </p>
      <hr />
      <h3>L’équipe</h3>
      <ul>
        <li>Ton nom / pseudo</li>
        {/* Ajoute ici les autres membres si besoin */}
      </ul>
      <p>
        N’hésite pas à consulter le <a href="https://github.com/TON-UTILISATEUR/react-films-tmdb" target="_blank" rel="noopener noreferrer">repository GitHub</a> pour plus d’informations.
      </p>
    </div>
  );
};

export default About;
