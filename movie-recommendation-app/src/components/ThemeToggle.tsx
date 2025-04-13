import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/userPreferencesSlice';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.userPreferences);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
        document.body.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button
            variant="outline-light"
            onClick={handleThemeToggle}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon}
                className="theme-icon"
            />
        </Button>
    );
};

export default ThemeToggle; 