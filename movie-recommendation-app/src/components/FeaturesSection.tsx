import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFilm, FaSearch, FaHeart, FaList } from 'react-icons/fa';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaFilm className="feature-icon" />,
      title: 'Vast Movie Collection',
      description: 'Access thousands of movies from different genres and eras.'
    },
    {
      icon: <FaSearch className="feature-icon" />,
      title: 'Smart Search',
      description: 'Find movies easily with our advanced search and filtering system.'
    },
    {
      icon: <FaHeart className="feature-icon" />,
      title: 'Personalized Recommendations',
      description: 'Get movie suggestions tailored to your taste and preferences.'
    },
    {
      icon: <FaList className="feature-icon" />,
      title: 'Watchlist Management',
      description: 'Create and manage your personal watchlist for future viewing.'
    }
  ];

  return (
    <section className="features-section py-5">
      <Container>
        <h2 className="text-center mb-5">Why Choose Our Platform?</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3}>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection; 