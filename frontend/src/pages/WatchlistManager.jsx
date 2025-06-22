import React, { useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';

const ManageWatchlists = () => {
  const { token } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [renameValue, setRenameValue] = useState('');

  // Fetch all user's watchlists
  const fetchLists = async () => {
    try {
      const res = await axios.get('/api/watchlists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLists(res.data);
    } catch (err) {
      console.error('Failed to load watchlists', err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Create a new watchlist
  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    try {
      await axios.post('/api/watchlists', { name: newListName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewListName('');
      fetchLists();
    } catch (err) {
      console.error('Failed to create watchlist', err);
    }
  };

  // Delete list
  const handleDeleteList = async (id) => {
    if (!window.confirm('Are you sure you want to delete this list?')) return;
    try {
      await axios.delete(`/api/watchlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedList(null);
      fetchLists();
    } catch (err) {
      console.error('Failed to delete watchlist', err);
    }
  };

  // Rename list
  const handleRenameList = async (id) => {
    try {
      await axios.put(`/api/watchlists/${id}`, { name: renameValue }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLists();
      setRenameValue('');
    } catch (err) {
      console.error('Failed to rename watchlist', err);
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white pt-30">Manage Your Watchlists</h2>

      {/* Create New Watchlist */}
     
      <div className="mb-6">
        <input
          type="text"
          placeholder="New watchlist name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="border px-3 py-2 rounded mr-2"
        />
        <button onClick={handleCreateList} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Create
        </button>
      </div>

      {/* Watchlists Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lists.map((list) => (
          <div key={list._id} className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{list.name}</h3>

            {/* Rename */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Rename list"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="px-2 py-1 rounded text-black border"
              />
              <button
                onClick={() => handleRenameList(list._id)}
                className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm"
              >
                Rename
              </button>
            </div>

            <button
              onClick={() => setSelectedList(selectedList?._id === list._id ? null : list)}
              className="text-blue-400 underline text-sm mb-2 cursor-pointer"
            >
              {selectedList?._id === list._id ? 'Hide Movies' : 'View Movies'}
            </button>

            <button
              onClick={() => handleDeleteList(list._id)}
              className="text-red-500 underline text-sm ml-4 cursor-pointer"
            >
              Delete
            </button>

            {/* Show Movies in the list */}
            {selectedList?._id === list._id && list.movies?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {list.movies.map((movie) => (
                  <div key={movie.movieId}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                      className="rounded shadow"
                    />
                    <p className="text-xs mt-1 text-center">{movie.title}</p>
                  </div>
                ))}
              </div>
            )}

            {selectedList?._id === list._id && list.movies?.length === 0 && (
              <p className="text-sm mt-2 text-gray-400">No movies in this list yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageWatchlists;




// import React, { useState, useEffect, useContext } from 'react';
// import axios from '../axiosConfig';
// import { AuthContext } from '../context/AuthContext';

// const ManageWatchlists = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const [watchlists, setWatchlists] = useState([]);
//   const [newName, setNewName] = useState('');
//   const [error, setError] = useState('');
//   const [selectedList, setSelectedList] = useState(null);

//   const fetchLists = async () => {
//     try {
//       const res = await axios.get('/api/watchlists');
//       setWatchlists(res.data);
//     } catch (err) {
//       setError('Failed to fetch watchlists');
//     }
//   };

//   const createWatchlist = async () => {
//     if (!newName) return;
//     try {
//       await axios.post('/api/watchlists', { name: newName });
//       setNewName('');
//       fetchLists();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to create list');
//     }
//   };

//   const deleteWatchlist = async (id) => {
//     if (!window.confirm('Are you sure?')) return;
//     await axios.delete(`/api/watchlists/${id}`);
//     fetchLists();
//   };

//   const removeMovie = async (watchlistId, movieId) => {
//     await axios.delete(`/api/watchlists/${watchlistId}/movie/${movieId}`);
//     fetchLists();
//   };

//   useEffect(() => {
//     if (isAuthenticated) fetchLists();
//   }, [isAuthenticated]);

//   if (!isAuthenticated) return <p className="p-4">Please login to manage watchlists.</p>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Manage Your Watchlists</h1>

//       <div className="flex items-center gap-2 mb-6">
//         <input
//           type="text"
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//           placeholder="New watchlist name"
//           className="border px-3 py-2 rounded w-full"
//         />
//         <button onClick={createWatchlist} className="bg-red-600 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </div>

//       {watchlists.map((list) => (
//         <div key={list._id} className="mb-8 border p-4 rounded shadow-sm bg-white text-black">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-xl font-semibold">{list.name}</h2>
//             <button
//               onClick={() => deleteWatchlist(list._id)}
//               className="text-red-600 hover:underline text-sm"
//             >
//               Delete
//             </button>
//           </div>

//           {list.movies.length === 0 ? (
//             <p className="text-sm text-gray-500">No movies added.</p>
//           ) : (
//             <div className="flex overflow-x-auto gap-4 scrollbar-hide">
//               {list.movies.map((movie) => (
//                 <div key={movie.movieId} className="min-w-[140px] text-center relative">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
//                     alt={movie.title}
//                     className="rounded-md w-full h-[200px] object-cover"
//                   />
//                   <p className="text-xs mt-1">{movie.title}</p>
//                   <button
//                     onClick={() => removeMovie(list._id, movie.movieId)}
//                     className="text-xs text-red-600 absolute top-2 right-2"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageWatchlists;
