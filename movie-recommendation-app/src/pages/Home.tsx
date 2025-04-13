import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { setTrending, setLoading, setError } from '../store/slices/moviesSlice';
import { getTrendingMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const { trending, loading, error } = useSelector((state: RootState) => state.movies);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                dispatch(setLoading(true));
                const response = await getTrendingMovies();
                dispatch(setTrending(response.data.results));
            } catch (err) {
                dispatch(setError('Failed to fetch trending movies'));
                toast.error('Failed to load trending movies');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchTrendingMovies();
    }, [dispatch]);

    return (
        <div className="home-page">
            <HeroSection />
            <FeaturesSection />
            
            <section className="trending-section py-5">
                <Container>
                    <h2 className="text-center mb-4">Trending Movies</h2>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-danger">
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4">
                                {trending.slice(0, 8).map(movie => (
                                    <Col key={movie.id}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))}
                            </Row>
                            <div className="text-center mt-4">
                                {isAuthenticated ? (
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={() => window.location.href = '/movies'}
                                    >
                                        View All Movies
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={() => window.location.href = '/login'}
                                    >
                                        Login to View All Movies
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </Container>
            </section>
        </div>
    );
};

export default Home; 