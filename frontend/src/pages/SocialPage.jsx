import React, { useContext, useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SocialPage = () => {
  const { token, user } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     console.log("🔁 useEffect triggered");
     console.log("🪪 token:", token);

    const fetchSocial = async () => {
        console.log("📡 Fetching social...");
      try {
        const res = await axios.get('/api/social', {
          headers: { Authorization: `Bearer ${token}` },
        });
       console.log("✅ Response:", res.data);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching social data:', err);
        setLoading(false);
      }
    };
      if (token) {
    fetchSocial();
  } else {
    console.log("⚠️ No token, fetch skipped.");
    setLoading(false); 
  }
  }, [token]);

  const handleFollowToggle = async (id, isFollowing) => {
    try {
      await axios.post(
        `/api/users/${isFollowing ? 'unfollow' : 'follow'}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh social data
      const res = await axios.get('/api/social', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFollowers(res.data.followers);
      setFollowing(res.data.following);
    } catch (err) {
      console.error('Follow toggle failed:', err);
    }
  };


  return (
    <div className="p-4 text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Social Connections</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* FOLLOWING */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Following ({following.length})</h3>
              {following.length === 0 ? (
                <p className="text-gray-400">You’re not following anyone yet.</p>
              ) : (
                <ul className="space-y-3">
                  {following.map((person) => (
                    <li
                      key={person._id}
                      className="bg-gray-800 p-3 rounded flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{person.username || person.email}</p>
                      </div>
                      <button
                        className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                        onClick={() => handleFollowToggle(person._id, true)}
                      >
                        Unfollow
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* FOLLOWERS */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Followers ({followers.length})</h3>
              {followers.length === 0 ? (
                <p className="text-gray-400">No one is following you yet.</p>
              ) : (
                <ul className="space-y-3">
                  {followers.map((person) => (
                    <li
                      key={person._id}
                      className="bg-gray-800 p-3 rounded flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{person.username || person.email}</p>
                      </div>
                      <button
                        className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                        onClick={() => handleFollowToggle(person._id, false)}
                      >
                        Follow Back
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Share section */}
          <div className="mt-8 bg-gray-900 p-4 rounded">
            <h4 className="text-lg font-semibold mb-2">Share Your Lists</h4>
            <p className="text-sm mb-2">You can share these with friends:</p>
            <ul className="text-blue-400 space-y-1">
              <li>
                <Link to={`/user/${user?.username}/watchlist`} className="hover:underline">
                  Public Watchlist
                </Link>
              </li>
              <li>
                <Link to={`/user/${user?.username}/favorites`} className="hover:underline">
                  Public Favorites
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialPage;
