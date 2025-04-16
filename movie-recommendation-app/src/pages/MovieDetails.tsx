import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { getMovieDetails } from '../services/tmdb';
import { Movie } from '../store/slices/moviesSlice';
import MovieActions from '../components/MovieActions';
import { toast } from 'react-toastify';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                if (!id) return;
                const response = await getMovieDetails(parseInt(id));
                setMovie(response.data);
            } catch (err) {
                setError('Failed to load movie details');
                toast.error('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const handleWatchMovie = () => {
        // In a real app, this would open a video player or streaming service
        window.open(`https://www.themoviedb.org/movie/${id}`, '_blank');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <Container className="error-container">
                <h2>Error</h2>
                <p>{error || 'Movie not found'}</p>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </Container>
        );
    }

    return (
        <Container className="movie-details-container py-5">
            <div className="movie-backdrop" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}>
                <div className="backdrop-overlay" />
            </div>
            
            <Row className="movie-content">
                <Col md={4} className="movie-poster-col">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                </Col>
                
                <Col md={8} className="movie-info-col">
                    <h1 className="movie-title">{movie.title}</h1>
                    
                    <div className="movie-meta">
                        <span><FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}</span>
                        <span><FontAwesomeIcon icon={faCalendar} /> {movie.release_date.split('-')[0]}</span>
                        <span><FontAwesomeIcon icon={faClock} /> {movie.runtime} min</span>
                    </div>

                    <div className="movie-actions">
                        <MovieActions movie={movie} size="lg" />
                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="watch-btn"
                            onClick={handleWatchMovie}
                        >
                            <FontAwesomeIcon icon={faPlay} /> Watch Movie
                        </Button>
                    </div>

                    <div className="movie-overview">
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </div>

                    <div className="movie-genres">
                        <h3>Genres</h3>
                        <div className="genre-tags">
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetails; 