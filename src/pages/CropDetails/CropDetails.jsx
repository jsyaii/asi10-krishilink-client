import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


// Simulate logged-in user (replace with actual auth context)
const loggedInUser = {
  _id: 'user123',
  name: 'Rahim',
  email: 'rahim@gmail.com'
};

const CropDetails = () => {
  const { id } = useParams(); // crop _id from URL
  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasInterest, setHasInterest] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch crop by ID
  const fetchCrop = async () => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:3000/crops/${id}`);
      if (!res.ok) throw new Error('Failed to fetch crop');
      const data = await res.json();
      setCrop(data);

      // Check if user already sent interest
      const alreadySent = data.interests?.some(
        (interest) => interest.userEmail === loggedInUser.email
      );
      setHasInterest(alreadySent);

      // Initialize total price
      setTotalPrice(quantity * data.pricePerUnit);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCrop();
  }, [id]);

  // Update total price dynamically
  useEffect(() => {
    if (crop) setTotalPrice(quantity * crop.pricePerUnit);
  }, [quantity, crop]);

  if (!crop) return <p className="text-center mt-10">Loading crop details...</p>;

  const isOwner = crop.owner?.ownerEmail === loggedInUser.email;

  // Submit interest
  const handleSubmit = async () => {
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }
    if (hasInterest) {
      alert('You have already sent an interest for this crop.');
      return;
    }

    const newInterest = {
      cropId: crop._id,
      userEmail: loggedInUser.email,
      userName: loggedInUser.name,
      quantity,
      message,
      status: 'pending'
    };

    try {
      const response = await fetch(`http://localhost:3000/crops/${crop._id}/interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInterest)
      });

      if (response.ok) {
        alert('Interest submitted successfully!');
        setHasInterest(true);
        fetchCrop();
        setShowModal(false);
      } else {
        alert('Failed to submit interest');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting interest');
    }
  };

  // Handle Accept/Reject for owner
  const handleInterestAction = async (interestId, action) => {
    try {
      const res = await fetch(
        `http://localhost:3000/crops/${crop._id}/interest/${interestId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: action })
        }
      );
      if (res.ok) {
        alert(`Interest ${action}ed`);
        fetchCrop();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Crop Information */}
      <div className="bg-white rounded shadow-lg p-6 mb-6">
        <h1 className="text-4xl font-bold mb-4">{crop.name}</h1>
        <img
          src={crop.image || 'https://via.placeholder.com/400'}
          alt={crop.name}
          className="w-full max-w-lg mx-auto object-cover rounded mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
         
{/* pp here */}
          
        </div>
      </div>

      {/* Interest Form (non-owner) */}
      {!isOwner && !hasInterest && (
        <div className="bg-white rounded shadow-lg p-6 mb-6 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Send Interest</h2>
          <div className="mb-4">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message"
              className="border p-2 rounded w-full"
            />
          </div>
          <p className="mb-4"><strong>Total Price:</strong> {totalPrice}</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Submit Interest
          </button>
        </div>
      )}

      {hasInterest && !isOwner && (
        <p className="text-red-500 font-semibold mb-6">
          You’ve already sent an interest for this crop.
        </p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Confirm Interest</h3>
            <p>Are you sure you want to submit interest for <strong>{quantity} {crop.unit}</strong>?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Received Interests for owner */}
      {isOwner && (
        <div className="bg-white rounded shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Received Interests</h2>
          {crop.interests?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Buyer Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Message</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {crop.interests.map((interest) => (
                    <tr key={interest._id} className="text-center">
                      <td className="border p-2">{interest.userName}</td>
                      <td className="border p-2">{interest.quantity}</td>
                      <td className="border p-2">{interest.message}</td>
                      <td className="border p-2">{interest.status}</td>
                      <td className="border p-2 space-x-2">
                        {interest.status === 'pending' ? (
                          <>
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                              onClick={() => handleInterestAction(interest._id, 'accepted')}
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              onClick={() => handleInterestAction(interest._id, 'rejected')}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No interest requests yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDetails;


























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// // Simulate logged-in user (replace with actual auth context)
// const loggedInUser = {
//   _id: 'user123',
//   name: 'Rahim',
//   email: 'rahim@gmail.com',
// };

// const CropDetails = () => {
//   const { id } = useParams();
//   const [crop, setCrop] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [message, setMessage] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [hasInterest, setHasInterest] = useState(false);

//   // Fetch crop by ID
//   const fetchCrop = async () => {
//     if (!id) return;
//     try {
//       const res = await fetch(`http://localhost:3000/crops/${id}`);
//       if (!res.ok) throw new Error('Failed to fetch crop');
//       const data = await res.json();
//       setCrop(data);

//       // Check if user already sent interest
//       const alreadySent = data.interests?.some(
//         (interest) => interest.userEmail === loggedInUser.email
//       );
//       setHasInterest(alreadySent);

//       // Initialize total price
//       setTotalPrice(quantity * data.pricePerUnit);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCrop();
//   }, [id]);

//   // Update total price when quantity changes
//   useEffect(() => {
//     if (crop) setTotalPrice(quantity * crop.pricePerUnit);
//   }, [quantity, crop]);

//   if (!crop) return <p>Loading crop details...</p>;

//   const isOwner = crop.owner?.ownerEmail === loggedInUser.email;

//   // Submit interest
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (quantity < 1) {
//       alert('Quantity must be at least 1');
//       return;
//     }
//     if (hasInterest) {
//       alert('You have already sent an interest for this crop.');
//       return;
//     }

//     const newInterest = {
//       cropId: crop._id,
//       userEmail: loggedInUser.email,
//       userName: loggedInUser.name,
//       quantity,
//       message,
//       status: 'pending',
//     };

//     if (!window.confirm(`Submit interest for ${quantity} ${crop.unit}?`)) return;

//     try {
//       const response = await fetch(`http://localhost:3000/crops/${crop._id}/interest`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newInterest),
//       });

//       if (response.ok) {
//         alert('Interest submitted successfully!');
//         setHasInterest(true);
//         fetchCrop(); // refresh crop data to include new interest
//       } else {
//         alert('Failed to submit interest');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error submitting interest');
//     }
//   };

//   // Handle Accept/Reject for owner
//   const handleInterestAction = async (interestId, action) => {
//     try {
//       const res = await fetch(`http://localhost:3000/crops/${crop._id}/interest/${interestId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: action }),
//       });
//       if (res.ok) {
//         alert(`Interest ${action}ed`);
//         fetchCrop();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Crop Info */}
//       <h1 className="text-4xl font-bold mb-4">{crop.name}</h1>
//       <img
//         src={crop.image || 'https://via.placeholder.com/300'}
//         alt={crop.name}
//         className="w-full max-w-md object-cover rounded mb-4"
//       />
//       <div className="mb-6 border p-4 rounded shadow">
//         <p><strong>Type:</strong> {crop.type}</p>
//         <p><strong>Price per Unit:</strong> {crop.pricePerUnit} / {crop.unit}</p>
//         <p><strong>Available Quantity:</strong> {crop.quantity}</p>
//         <p><strong>Description:</strong> {crop.description}</p>
//         <p><strong>Location:</strong> {crop.location}</p>
//         <p><strong>Owner:</strong> {crop.owner?.ownerName} ({crop.owner?.ownerEmail})</p>
//       </div>

//       {/* Interest Form for non-owner */}
//       {!isOwner && !hasInterest && (
//         <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-6">
//           <h2 className="text-2xl font-semibold mb-4">Send Interest</h2>
//           <div className="mb-4">
//             <label className="block mb-1">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Message</label>
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Write a message"
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <p className="mb-4"><strong>Total Price:</strong> {totalPrice}</p>
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
//           >
//             Submit Interest
//           </button>
//         </form>
//       )}

//       {hasInterest && !isOwner && (
//         <p className="text-red-500 font-semibold mb-6">
//           You’ve already sent an interest for this crop.
//         </p>
//       )}

//       {/* Received Interests for owner */}
//       {isOwner && (
//         <div className="border p-4 rounded shadow">
//           <h2 className="text-2xl font-semibold mb-4">Received Interests</h2>
//           {crop.interests?.length > 0 ? (
//             <table className="w-full border-collapse border">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Buyer Name</th>
//                   <th className="border p-2">Quantity</th>
//                   <th className="border p-2">Message</th>
//                   <th className="border p-2">Status</th>
//                   <th className="border p-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {crop.interests.map((interest) => (
//                   <tr key={interest._id} className="text-center">
//                     <td className="border p-2">{interest.userName}</td>
//                     <td className="border p-2">{interest.quantity}</td>
//                     <td className="border p-2">{interest.message}</td>
//                     <td className="border p-2">{interest.status}</td>
//                     <td className="border p-2 space-x-2">
//                       {interest.status === 'pending' && (
//                         <>
//                           <button
//                             className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                             onClick={() => handleInterestAction(interest._id, 'accepted')}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                             onClick={() => handleInterestAction(interest._id, 'rejected')}
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}
//                       {interest.status !== 'pending' && <span>—</span>}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No interest requests yet.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CropDetails;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// // Simulate logged-in user (replace with actual auth context)
// const loggedInUser = {
//   _id: 'user123',
//   name: 'Rahim',
//   email: 'rahim@gmail.com'
// };

// const CropDetails = () => {
//   const { id } = useParams(); // crop _id from URL
//   const [crop, setCrop] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [message, setMessage] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [hasInterest, setHasInterest] = useState(false);

//   // Fetch crop by ID
//   useEffect(() => {
//     if (!id) return;

//     fetch(`http://localhost:3000/crops/${id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch crop');
//         return res.json();
//       })
//       .then(data => {
//         setCrop(data);

//         // Initialize total price
//         setTotalPrice(data.pricePerUnit * quantity);

//         // Check if user already sent interest
//         const alreadySent = data.interests?.some(
//           interest => interest.userEmail === loggedInUser.email
//         );
//         setHasInterest(alreadySent);
//       })
//       .catch(err => console.error(err));
//   }, [id]);

//   // Update total price when quantity changes
//   useEffect(() => {
//     if (crop) {
//       setTotalPrice(quantity * crop.pricePerUnit);
//     }
//   }, [quantity, crop]);

//   if (!crop) return <p>Loading crop details...</p>;

//   const isOwner = crop.owner?.ownerEmail === loggedInUser.email;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (quantity < 1) {
//       alert('Quantity must be at least 1');
//       return;
//     }

//     if (hasInterest) {
//       alert('You have already sent an interest for this crop.');
//       return;
//     }

//     const newInterest = {
//       cropId: crop._id,
//       userEmail: loggedInUser.email,
//       userName: loggedInUser.name,
//       quantity,
//       message,
//       status: 'pending'
//     };

//     try {
//       const response = await fetch(`http://localhost:3000/crops/${crop._id}/interest`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newInterest)
//       });

//       if (response.ok) {
//         alert('Interest submitted successfully!');
//         setHasInterest(true);
//       } else {
//         alert('Failed to submit interest');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error submitting interest');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{crop.title}</h1>
//       <img
//         src={crop.image || 'https://via.placeholder.com/300'}
//         alt={crop.title}
//         className="w-full max-w-md object-cover rounded mb-4"
//       />

//       <div className="mb-6">
//         <p><strong>Price per Unit:</strong> {crop.pricePerUnit} / {crop.unit}</p>
//         <p><strong>Available Quantity:</strong> {crop.quantity}</p>
//         <p><strong>Description:</strong> {crop.description}</p>
//         <p><strong>Location:</strong> {crop.location}</p>
//         <p><strong>Owner:</strong> {crop.owner?.ownerName} ({crop.owner?.ownerEmail})</p>
//       </div>

//       {!isOwner && !hasInterest && (
//         <form onSubmit={handleSubmit} className="border p-4 rounded shadow max-w-md">
//           <h2 className="text-xl font-semibold mb-4">Send Interest</h2>

//           <div className="mb-4">
//             <label className="block mb-1">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={e => setQuantity(Number(e.target.value))}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Message</label>
//             <input
//               type="text"
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//               placeholder="Write a message"
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           <p className="mb-4"><strong>Total Price:</strong> {totalPrice}</p>

//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
//           >
//             Submit Interest
//           </button>
//         </form>
//       )}

//       {hasInterest && (
//         <p className="text-red-500 font-semibold">You’ve already sent an interest for this crop.</p>
//       )}

//       {isOwner && (
//         <p className="text-blue-500 font-semibold">You are the owner of this crop.</p>
//       )}
//     </div>
//   );
// };

// export default CropDetails;
