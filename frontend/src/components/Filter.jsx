import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { motion } from "framer-motion";

const Filter = ({ onFilter }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');


  // Fetch genres from backend
  useEffect(() => {
    const fetchGenres = async () => {

      try {
        const res = await axios.get('/api/genres');
        console.log(res.data)
        setGenres(res.data);
      } catch (err) {
        console.error('Failed to load genres', err);
      }
    };

    fetchGenres();
  }, []);

  // Handle filter apply
  const handleFilter = () => {
    const filterData = {};
    if (selectedGenre) filterData.genre = selectedGenre;
    if (selectedYear) filterData.year = selectedYear;
    onFilter({ genre: selectedGenre, year: selectedYear });
  };

  const handleReset = () => {
    setSelectedGenre('');
    setSelectedYear('');
    onFilter({ genre: '', year: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-dark p-6 rounded-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {/* Sort By */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full max-w-[11rem] p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="release_date.desc">Newest</option>
          </select>
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full max-w-[11rem] p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">Year</label>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            placeholder="e.g. 2023"
            className="w-full max-w-[8rem] p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onFilter({ genre: selectedGenre, year: selectedYear, sort_by: sortBy })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Apply Filter
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Reset
        </button>
      </div>
    </motion.div>


  );
};

export default Filter;
