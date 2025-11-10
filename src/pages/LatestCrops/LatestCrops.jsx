import React, { useEffect, useState } from 'react';
import Crops from '../Crops/Crops';

const LatestCrops = ({LatestCropsPromise}) => {
 const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    LatestCropsPromise
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching latest crops:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [LatestCropsPromise]);

  if (loading) return <p>Loading latest crops...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;




    return (
        <div className="mt-20 px-50 gap-6">
      <h2 className="font-bold text-4xl text-center mb-5">
        Recent <span className="text-primary">Crops</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {crops.map((crop) => (
          <Crops key={crop._id} crop={crop} />
        ))}
      </div>
    </div>
    );
}

export default LatestCrops;
