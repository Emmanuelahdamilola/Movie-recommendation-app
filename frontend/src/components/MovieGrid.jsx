
import React from 'react';
import { Link } from 'react-router-dom';
import WatchlistButton from './WatchlistButton';
import FavoriteButton from './FavoriteButton';

const MovieGrid = ({ movies, title }) => {
  if (!movies || !movies.length) return null;

  return (
    <div className="mb-6 px- md:px-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-white">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-2 md:px-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-dark rounded shadow overflow-hidden">
            <Link to={`/movie/${movie.id}`}>
              <div className="aspect-[2/3] w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </Link>
            <div className="p-2 text-white text-xs sm:text-sm text-center">
              <p className="truncate">{movie.title}</p>
              <div className="flex justify-center mt-1 gap-2">
                <WatchlistButton movie={movie} />
                <FavoriteButton movie={movie} />
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default MovieGrid;
