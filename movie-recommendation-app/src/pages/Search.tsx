import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Container, Pagination } from 'react-bootstrap';
import { AppDispatch, RootState } from '../store';
import { searchMoviesAsync, setCurrentPage } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';

const Search = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const { filtered: searchResults, loading, error, currentPage, totalPages } = 
        useSelector((state: RootState) => state.movies);

    useEffect(() => {
        if (query) {
            dispatch(searchMoviesAsync({ query, page: currentPage }));
        }
    }, [dispatch, query, currentPage]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <Container>
            <h1 className="mb-4">Search Results for "{query}"</h1>
            
            {searchResults.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>No movies found matching your search.</h3>
                </div>
            ) : (
                <>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {searchResults.map(movie => (
                            <Col key={movie.id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination>
                                <Pagination.First 
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(1)}
                                />
                                <Pagination.Prev 
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                                
                                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                                    const pageNum = currentPage - 2 + idx;
                                    if (pageNum > 0 && pageNum <= totalPages) {
                                        return (
                                            <Pagination.Item
                                                key={pageNum}
                                                active={pageNum === currentPage}
                                                onClick={() => handlePageChange(pageNum)}
                                            >
                                                {pageNum}
                                            </Pagination.Item>
                                        );
                                    }
                                    return null;
                                })}
                                
                                <Pagination.Next 
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                                <Pagination.Last 
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(totalPages)}
                                />
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default Search; 