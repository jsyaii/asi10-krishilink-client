import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCrops, setFilteredCrops] = useState([]);

  // Fetch crops from backend
  useEffect(() => {
    fetch('https://krishilink-server-khaki.vercel.app/crops')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCrops(data);
          setFilteredCrops(data);
        } else {
          console.error('Data from API is not an array:', data);
          setCrops([]);
          setFilteredCrops([]);
        }
      })
      .catch(err => console.error('Error fetching crops:', err));
  }, []);

  // Filter crops safely using `title`
  useEffect(() => {
    const filtered = crops.filter(crop =>
      (crop.title || '').toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCrops(filtered);
  }, [search, crops]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Crops</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-6 w-2/8"
      />

      {/* Crop cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.length > 0 ? (
          filteredCrops.map(crop => {
            const { _id, title, price_min, price_max, image } = crop;

            return (
              <div
                key={_id || Math.random()}
                className="border rounded shadow p-4 flex flex-col justify-between"
              >
                <img
                  src={image || 'https://via.placeholder.com/150'}
                  alt={title || 'No title'}
                  className="h-40 w-full object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold">{title || 'Untitled Crop'}</h2>
                <p>Price: {price_min || 'N/A'} - {price_max || 'N/A'}</p>
              
<Link to={`/crops/${_id}`}>
  <button className="mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
    View Details
  </button>
</Link>
              </div>
            );
          })
        ) : (
          <p>No crops found.</p>
        )}
      </div>
    </div>
  );
};

export default AllCrops;










