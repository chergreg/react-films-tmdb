import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 text-center">Bienvenue sur React Films TMDB</h1>
          <p className="lead text-center">
            Découvrez les derniers films, explorez les genres et trouvez toutes les informations sur vos acteurs préférés grâce à l’API TMDB.
          </p>
        </Col>
      </Row>
      
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3 text-center">
                Films à découvrir prochainement...
              </Card.Title>
              {/* Ici, tu pourras afficher la liste de films populaires depuis l’API TMDB */}
              <div className="text-center text-muted">
                <em>Affichage des films à venir prochainement...</em>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
