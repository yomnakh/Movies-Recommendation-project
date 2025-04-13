import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Movie } from '../store/slices/moviesSlice';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../services/tmdb';
import MovieActions from './MovieActions';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${POSTER_SIZES.medium}${movie.poster_path}`
        : '/placeholder.jpg';

    return (
        <Card className="h-100 movie-card">
            <div className="movie-card-image-container">
                <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                    <Card.Img
                        variant="top"
                        src={posterUrl}
                        alt={movie.title}
                        className="movie-poster"
                    />
                </Link>
                <div className="movie-actions-overlay">
                    <MovieActions movie={movie} size="sm" />
                </div>
            </div>
            <Card.Body>
                <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                    <Card.Title className="text-truncate">{movie.title}</Card.Title>
                    <Card.Text className="text-muted">
                        {new Date(movie.release_date).getFullYear()}
                        <span className="ms-2">⭐ {movie.vote_average.toFixed(1)}</span>
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default MovieCard; 