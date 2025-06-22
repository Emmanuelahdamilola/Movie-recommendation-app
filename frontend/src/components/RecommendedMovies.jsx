import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import MovieGrid from './MovieGrid';

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('/api/recommendations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMovies(res.data);
      } catch (err) {
        console.error('Error fetching recommendations', err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="px-4 py-6 bg-gray-800">
      <MovieGrid movies={movies} title="Recommended for You" />
    </div>
  );
};

export default RecommendedMovies;
