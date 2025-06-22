const FollowButton = ({ targetUserId, token }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Optional: fetch following state
  }, [targetUserId]);

  const toggleFollow = async () => {
    try {
      const url = `/api/users/${targetUserId}/${isFollowing ? 'unfollow' : 'follow'}`;
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={toggleFollow} className="bg-blue-600 text-white px-4 py-2 rounded">
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};
