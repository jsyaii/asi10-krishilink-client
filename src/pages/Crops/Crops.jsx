import React from 'react';
import { Link } from 'react-router';

const Crops = ({crop}) => {
    const { _id, title, price_min, price_max, image } = crop;
    return (

        <div className="card w-full bg-base-100 shadow-sm  max-w-md mx-auto ">
  <figure className="px-4 pt-4 w-full aspect-[4/3] overflow-hidden rounded-xl">
    <img src={image} alt={title} className="object-cover w-full h-full" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>Price: ${price_min} - {price_max}</p>
    <div className="card-actions">
      {/* <Link to={`/crops/${_id}`} className="btn btn-primary w-full">
        View Details
      </Link> */}
      {/* <Link to={`/all-crops`} className="btn btn-primary w-full">
        View Details
      </Link> */}
    </div>
      <div className="text-center mt-12">
        <Link
          to="/all-crops"
          className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
        >
          View All Crops
        </Link>
      </div>
  </div>
</div>

       
    );
}

export default Crops;
