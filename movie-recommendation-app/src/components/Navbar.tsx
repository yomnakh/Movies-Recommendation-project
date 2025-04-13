import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar as BsNavbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faUser, faFilm } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { clearPreferences } from '../store/slices/userPreferencesSlice';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const userPreferences = useSelector((state: RootState) => state.userPreferences);
    
    // Add null checks and default to empty arrays
    const favorites = userPreferences?.favorites || [];
    const watchlist = userPreferences?.watchlist || [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            if (isAuthenticated) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            } else {
                navigate(`/login?redirect=/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }
            setSearchQuery('');
        }
    };

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(clearPreferences());
        navigate('/');
    };

    return (
        <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar-custom">
            <Container>
                <BsNavbar.Brand as={Link} to="/">
                    🎬 Movie Recommendations
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/movies">
                            <FontAwesomeIcon icon={faFilm} className="me-1" />
                            Movies
                        </Nav.Link>
                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/favorites">
                                    <FontAwesomeIcon icon={faHeart} className="me-1" />
                                    Favorites ({favorites.length})
                                </Nav.Link>
                                <Nav.Link as={Link} to="/watchlist">
                                    <FontAwesomeIcon icon={faBookmark} className="me-1" />
                                    Watchlist ({watchlist.length})
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Form className="d-flex me-3" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Search movies..."
                            className="me-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                    <div className="d-flex align-items-center">
                        <ThemeToggle />
                        {isAuthenticated ? (
                            <NavDropdown 
                                title={
                                    <span className="text-light ms-3">
                                        <FontAwesomeIcon icon={faUser} className="me-1" />
                                        {user?.username}
                                    </span>
                                } 
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav>
                                <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="text-light">Register</Nav.Link>
                            </Nav>
                        )}
                    </div>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar; 