const RecentlyViewed = ({ token }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/viewed', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [token]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-white">🕒 Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
        {history.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
