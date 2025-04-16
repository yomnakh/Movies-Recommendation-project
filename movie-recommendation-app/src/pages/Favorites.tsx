import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { RootState } from '../store';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const { favorites } = useSelector((state: RootState) => state.userPreferences);

    return (
        <Container className="py-5 mt-4">
            <h1 className="mb-4">My Favorites</h1>
            
            {favorites.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>No favorite movies yet</h3>
                    <p className="text-muted">
                        Add movies to your favorites by clicking the heart icon on any movie card
                    </p>
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {favorites.map(movie => (
                        <Col key={movie.id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Favorites;