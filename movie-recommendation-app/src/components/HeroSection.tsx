// import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HeroSection = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <section 
            className="hero-section" 
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`
            }}
        >
            <div className="hero-content">
                <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
                <p className="hero-description">
                    Get personalized movie recommendations, create watchlists, and explore a vast collection of films from different genres and eras.
                </p>
                {isAuthenticated ? (
                    <Link to="/movies">
                        <Button className="hero-button">
                            Explore Movies
                        </Button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <Button className="hero-button">
                            Get Started
                        </Button>
                    </Link>
                )}
            </div>
        </section>
    );
};

export default HeroSection; 