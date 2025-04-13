import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { RootState } from '../store';
import { toggleFavorite, toggleWatchlist } from '../store/slices/userPreferencesSlice';
import { Movie } from '../store/slices/moviesSlice';
import { toast } from 'react-toastify';

interface MovieActionsProps {
    movie: Movie;
    size?: 'sm' | 'lg';
}

const MovieActions = ({ movie, size }: MovieActionsProps) => {
    const dispatch = useDispatch();
    const userPreferences = useSelector((state: RootState) => state.userPreferences);
    
    // Add null checks and default to empty arrays
    const favorites = userPreferences?.favorites || [];
    const watchlist = userPreferences?.watchlist || [];

    const isFavorite = favorites.some(m => m.id === movie.id);
    const isInWatchlist = watchlist.some(m => m.id === movie.id);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(movie));
        toast.success(
            isFavorite 
                ? 'Removed from favorites' 
                : 'Added to favorites'
        );
    };

    const handleToggleWatchlist = () => {
        dispatch(toggleWatchlist(movie));
        toast.success(
            isInWatchlist 
                ? 'Removed from watchlist' 
                : 'Added to watchlist'
        );
    };

    return (
        <ButtonGroup size={size}>
            <Button
                variant={isFavorite ? 'danger' : 'outline-danger'}
                onClick={handleToggleFavorite}
                className="movie-action-btn"
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <FontAwesomeIcon 
                    icon={isFavorite ? faHeart : farHeart}
                    className={`action-icon ${isFavorite ? 'active' : ''}`}
                />
            </Button>
            <Button
                variant={isInWatchlist ? 'primary' : 'outline-primary'}
                onClick={handleToggleWatchlist}
                className="movie-action-btn"
                title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
                <FontAwesomeIcon 
                    icon={isInWatchlist ? faBookmark : farBookmark}
                    className={`action-icon ${isInWatchlist ? 'active' : ''}`}
                />
            </Button>
        </ButtonGroup>
    );
};

export default MovieActions; 