import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Film from './pages/Film';
import Categorie from './pages/Categorie';
import Acteur from './pages/Acteur';
import Recherche from './pages/Recherche';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<Film />} />
      <Route path="/categorie/:genreId" element={<Categorie />} />
      <Route path="/acteur/:id" element={<Acteur />} />
      <Route path="/recherche" element={<Recherche />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
