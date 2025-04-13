import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { RootState } from '../store';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
    const { watchlist } = useSelector((state: RootState) => state.userPreferences);

    return (
        <Container>
            <h1 className="mb-4">My Watchlist</h1>
            
            {watchlist.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>Your watchlist is empty</h3>
                    <p className="text-muted">
                        Add movies to your watchlist by clicking the bookmark icon on any movie card
                    </p>
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {watchlist.map(movie => (
                        <Col key={movie.id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Watchlist; 