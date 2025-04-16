import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Spinner, Pagination } from 'react-bootstrap';
import { RootState } from '../store';
import { setTrending, setLoading, setError, Movie } from '../store/slices/moviesSlice';
import { getTrendingMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';

const Movies = () => {
    const dispatch = useDispatch();
    const { trending, loading, error } = useSelector((state: RootState) => state.movies);
    const [sortBy, setSortBy] = useState('popularity');
    const [filterGenre, setFilterGenre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                dispatch(setLoading(true));
                const response = await getTrendingMovies();
                dispatch(setTrending(response.data.results));
            } catch (err) {
                dispatch(setError('Failed to fetch movies'));
                toast.error('Failed to load movies');
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchMovies();
    }, [dispatch]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterGenre(e.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const sortedAndFilteredMovies = [...trending]
        .sort((a, b) => {
            if (sortBy === 'popularity') {
                return b.popularity - a.popularity;
            } else if (sortBy === 'rating') {
                return b.vote_average - a.vote_average;
            } else if (sortBy === 'date') {
                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            }
            return 0;
        })
        .filter(movie => {
            if (!filterGenre) return true;
            return movie.genre_ids.includes(parseInt(filterGenre));
        });

    // Pagination logic
    const totalPages = Math.ceil(sortedAndFilteredMovies.length / moviesPerPage);
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = sortedAndFilteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        items.push(
            <Pagination.Prev
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
        );

        // First page
        if (startPage > 1) {
            items.push(
                <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                    1
                </Pagination.Item>
            );
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="ellipsis1" />);
            }
        }

        // Page numbers
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="ellipsis2" />);
            }
            items.push(
                <Pagination.Item
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        // Next button
        items.push(
            <Pagination.Next
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        );

        return items;
    };

//     return (
//         <Container className="movies-page py-5">
//             <h1 className="text-center mb-4">Movies</h1>
            
//             <Row className="mb-4">
//                 <Col md={6}>
//                     <Form.Group>
//                         <Form.Label>Sort By</Form.Label>
//                         <Form.Select 
//                             value={sortBy} 
//                             onChange={handleSortChange}
//                             aria-label="Sort movies by"
//                         >
//                             <option value="popularity">Popularity</option>
//                             <option value="rating">Rating</option>
//                             <option value="date">Release Date</option>
//                         </Form.Select>
//                     </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                     <Form.Group>
//                         <Form.Label>Filter by Genre</Form.Label>
//                         <Form.Select 
//                             value={filterGenre} 
//                             onChange={handleFilterChange}
//                             aria-label="Filter movies by genre"
//                         >
//                             <option value="">All Genres</option>
//                             <option value="28">Action</option>
//                             <option value="12">Adventure</option>
//                             <option value="16">Animation</option>
//                             <option value="35">Comedy</option>
//                             <option value="80">Crime</option>
//                             <option value="99">Documentary</option>
//                             <option value="18">Drama</option>
//                             <option value="10751">Family</option>
//                             <option value="14">Fantasy</option>
//                             <option value="36">History</option>
//                             <option value="27">Horror</option>
//                             <option value="10402">Music</option>
//                             <option value="9648">Mystery</option>
//                             <option value="10749">Romance</option>
//                             <option value="878">Science Fiction</option>
//                             <option value="10770">TV Movie</option>
//                             <option value="53">Thriller</option>
//                             <option value="10752">War</option>
//                             <option value="37">Western</option>
//                         </Form.Select>
//                     </Form.Group>
//                 </Col>
//             </Row>

//             {loading ? (
//                 <div className="text-center">
//                     <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                 </div>
//             ) : error ? (
//                 <div className="text-center text-danger">
//                     <p>{error}</p>
//                 </div>
//             ) : (
//                 <>
//                     <Row xs={1} sm={2} md={3} lg={4} className="g-4">
//                         {currentMovies.map(movie => (
//                             <Col key={movie.id}>
//                                 <MovieCard movie={movie} />
//                             </Col>
//                         ))}
//                     </Row>
                    
//                     {totalPages > 1 && (
//                         <div className="pagination-container">
//                             <Pagination>{renderPaginationItems()}</Pagination>
//                         </div>
//                     )}
//                 </>
//             )}
//         </Container>
//     );
// };

return (
    <Container className="movies-page py-5 mt-5 custom-margin">
        <h1 className="text-center mb-4">Movies</h1>
        
        <Row className="mb-4">
            <Col md={6}>
                <Form.Group>
                    <Form.Label>Sort By</Form.Label>
                    <Form.Select 
                        value={sortBy} 
                        onChange={handleSortChange}
                        aria-label="Sort movies by"
                    >
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="date">Release Date</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group>
                    <Form.Label>Filter by Genre</Form.Label>
                    <Form.Select 
                        value={filterGenre} 
                        onChange={handleFilterChange}
                        aria-label="Filter movies by genre"
                    >
                        <option value="">All Genres</option>
                        <option value="28">Action</option>
                        <option value="12">Adventure</option>
                        <option value="16">Animation</option>
                        <option value="35">Comedy</option>
                        <option value="80">Crime</option>
                        <option value="99">Documentary</option>
                        <option value="18">Drama</option>
                        <option value="10751">Family</option>
                        <option value="14">Fantasy</option>
                        <option value="36">History</option>
                        <option value="27">Horror</option>
                        <option value="10402">Music</option>
                        <option value="9648">Mystery</option>
                        <option value="10749">Romance</option>
                        <option value="878">Science Fiction</option>
                        <option value="10770">TV Movie</option>
                        <option value="53">Thriller</option>
                        <option value="10752">War</option>
                        <option value="37">Western</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        {loading ? (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) : error ? (
            <div className="text-center text-danger">
                <p>{error}</p>
            </div>
        ) : (
            <>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {currentMovies.map(movie => (
                        <Col key={movie.id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
                
                {totalPages > 1 && (
                    <div className="pagination-container">
                        <Pagination>{renderPaginationItems()}</Pagination>
                    </div>
                )}
            </>
        )}
    </Container>
);
}

export default Movies; 