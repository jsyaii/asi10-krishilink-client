import { useParams, Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';

const CropDetails = () => {
  const { id } = useParams();
  const { user: currentUser, loading: authLoading } = useContext(AuthContext);

  // ------------------- Hooks -------------------
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [interestActionLoading, setInterestActionLoading] = useState(false);

  const currentUserEmail = currentUser?.email;
  const currentUserName = currentUser?.displayName || currentUser?.email;

  // ------------------- Fetch Crop -------------------
  const fetchCrop = async () => {
    try {
      const res = await fetch(`https://krishilink-server-khaki.vercel.app/crops/${id}`);
      if (!res.ok) throw new Error('Failed to fetch crop');
      const data = await res.json();
      setCrop(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrop();
  }, [id]);

  // ------------------- Submit Interest -------------------
  const handleSubmit = async () => {
    setSubmitError(null);

    if (!currentUserEmail || !currentUserName) {
      setSubmitError('User information is not ready. Please try again.');
      return;
    }

    if (quantity < 1) {
      setSubmitError('Quantity must be at least 1');
      return;
    }

    const interestData = {
  cropId: crop._id, // or maybe crop.id or cropId?
  userEmail: currentUserEmail,
  userName: currentUserName,
  quantity,
  message,
  status: "pending",
  cropName: crop.title,
  cropOwner: crop.seller_name || "Unknown Owner",
};
console.log(interestData);

    try {
      const res = await fetch('https://krishilink-server-khaki.vercel.app/interests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interestData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to submit interest');
      }

      setSubmitSuccess('Interest submitted successfully!');
      setShowForm(false);
      setConfirmModal(false);
      setQuantity(1);
      setMessage('');
      await fetchCrop(); // refresh crop to show new interest
    } catch (err) {
      setSubmitError(err.message);
      toast.error(err.message);
    }
  };

  // ------------------- Owner Action -------------------
  const handleInterestAction = async (interestId, action) => {
    try {
      setInterestActionLoading(true);

      const interest = crop.interests.find((i) => i._id === interestId);

      // Update interest status
      const res = await fetch(`https://krishilink-server-khaki.vercel.app/interests/${interestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action }),
      });
      if (!res.ok) throw new Error('Failed to update interest status');

      // Reduce crop quantity if accepted
      let updatedQuantity = crop.quantity;
      if (action === 'accepted') {
        updatedQuantity = Math.max(0, crop.quantity - interest.quantity);
        await fetch(`https://krishilink-server-khaki.vercel.app/crops/${crop._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: updatedQuantity }),
        });
      }

      // Update UI instantly
      setCrop((prev) => ({
        ...prev,
        quantity: updatedQuantity,
        interests: prev.interests.map((i) =>
          i._id === interestId ? { ...i, status: action } : i
        ),
      }));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setInterestActionLoading(false);
    }
  };

  // ------------------- Conditional Rendering -------------------
  if (loading || authLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  if (!crop) return <p className="text-center mt-10">No crop found.</p>;

  const { title, price_min, price_max, image, description, category, owner } = crop;
  const isOwner = owner?.ownerEmail === currentUserEmail;
  const totalPrice = quantity * price_min;

  // ------------------- JSX -------------------
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Crop Image */}
        <div className="md:w-1/2">
          <img
            src={image || 'https://via.placeholder.com/400x300'}
            alt={title}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>

        {/* Crop Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600 mb-2">Category: {category || 'General'}</p>
            <p className="text-green-700 font-semibold mb-4">
              Price: ${price_min} - ${price_max}
            </p>
            <p className="text-gray-700 mb-6">{description || 'No description provided.'}</p>
          </div>

          {!isOwner && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setShowForm(!showForm)}
                  disabled={crop.quantity <= 0}
                  className={`bg-green-600 text-white px-6 py-2 rounded-lg transition ${
                    crop.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                  }`}
                >
                  Interest
                </button>

                <Link
                  to="/all-crops"
                  className="ml-auto text-green-600 hover:underline flex items-center"
                >
                  &larr; Back to All Crops
                </Link>
              </div>

              {showForm && (
                <div className="mt-4 border p-4 rounded shadow bg-gray-50">
                  <h3 className="font-semibold text-lg mb-3">Submit Your Interest</h3>
                  {submitError && <p className="text-red-500 mb-2">{submitError}</p>}
                  {submitSuccess && <p className="text-green-600 mb-2">{submitSuccess}</p>}

                  <div className="mb-3">
                    <label className="block mb-1 font-medium">Quantity (kg)</label>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      max={crop.quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border p-2 w-full rounded"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block mb-1 font-medium">Message</label>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Interested in ${quantity} kg`}
                      className="border p-2 w-full rounded"
                    />
                  </div>

                  <p className="font-semibold mb-3">Total Price: ${totalPrice}</p>

                  <button
                    onClick={() => setConfirmModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Submit Interest
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Interest</h3>
            <p>Are you sure you want to submit interest for {quantity} kg?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Owner Section */}
      {isOwner && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Received Interests</h2>
          {crop.interests && crop.interests.length > 0 ? (
            <table className="w-full border border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Buyer Name</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {crop.interests.map((interest) => (
                  <tr key={interest._id}>
                    <td className="border px-4 py-2">{interest.userName}</td>
                    <td className="border px-4 py-2">{interest.quantity}</td>
                    <td className="border px-4 py-2">{interest.message}</td>
                    <td className="border px-4 py-2">{interest.status}</td>
                    <td className="border px-4 py-2 flex gap-2">
                      {interest.status === 'pending' ? (
                        <>
                          <button
                            disabled={interestActionLoading}
                            onClick={() => handleInterestAction(interest._id, 'accepted')}
                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            disabled={interestActionLoading}
                            onClick={() => handleInterestAction(interest._id, 'rejected')}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500 px-2 py-1">{interest.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No interests received yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropDetails;




// import { useParams, Link, NavLink } from 'react-router';
// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../provider/AuthProvider';
// import { toast } from 'react-toastify';


// const CropDetails = () => {
//   const { id } = useParams();
//   const { user: currentUser, loading: authLoading } = useContext(AuthContext);

//   // ------------------- Hooks -------------------
//   const [crop, setCrop] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [message, setMessage] = useState('');
//   const [confirmModal, setConfirmModal] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [submitSuccess, setSubmitSuccess] = useState(null);
//   const [interestActionLoading, setInterestActionLoading] = useState(false);

//   const currentUserEmail = currentUser?.email;
//   const currentUserName = currentUser?.displayName || currentUser?.email;

//   // ------------------- Fetch Crop -------------------
//   useEffect(() => {
//     const fetchCrop = async () => {
//       try {
//         const res = await fetch(`https://krishilink-server-khaki.vercel.app/crops/${id}`);
//         if (!res.ok) throw new Error('Failed to fetch crop');
//         const data = await res.json();
//         setCrop(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCrop();
//   }, [id]);

//   // ------------------- Handlers -------------------
//   // const handleSubmit = async () => {
//   //   setSubmitError(null);
//   //   setSubmitSuccess(null);

//   //   if (!currentUserEmail || !currentUserName) {
//   //     setSubmitError('User information is not ready. Please try again.');
//   //     return;
//   //   }

//   //   if (quantity < 1) {
//   //     setSubmitError('Quantity must be at least 1');
//   //     return;
//   //   }
//    const handleSubmit = async () => {
//     setSubmitError(null);

//     if (!currentUserEmail || !currentUserName) {
//       setSubmitError('User information is not ready. Please try again.');
//       return;
//     }

//     if (quantity < 1) {
//       setSubmitError('Quantity must be at least 1');
//       return;
//     }

//     // const interestData = {
//     //   cropId: id,
//     //   userEmail: currentUserEmail,
//     //   userName: currentUserName,
//     //   quantity,
//     //   message: message || `Interested in ${quantity} kg`,
//     // };
//     const interestData = {
//   cropId: crop?._id, // use the real crop ID from DB
//   userEmail: currentUserEmail,
//   userName: currentUserName,
//   quantity,
//   message: message || `Interested in ${quantity} kg`,
// };


//     try {
//       const res = await fetch('https://krishilink-server-khaki.vercel.app/interests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(interestData),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || 'Failed to submit interest');
//       }

//       setSubmitSuccess('Interest submitted successfully!');
//       setShowForm(false);
//       setConfirmModal(false);
//       setQuantity(1);
//       setMessage('');
//       await fetchCrop(); // refresh crop to show new interest
//     } catch (err) {
//       setSubmitError(err.message);
//       toast.error(err.message); // ✅ error toast
//     }
//   };

//   const handleInterestAction = async (interestId, action) => {
//     try {
//       setInterestActionLoading(true);
//       const res = await fetch(`https://krishilink-server-khaki.vercel.app/interests/${interestId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: action }),
//       });
//       if (!res.ok) throw new Error('Failed to update interest status');
//       await fetchCrop();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setInterestActionLoading(false);
//     }
//   };

//   // ------------------- Conditional Rendering -------------------
//   if (loading || authLoading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
//   if (!crop) return <p className="text-center mt-10">No crop found.</p>;

//   const { title, price_min, price_max, image, description, category, owner } = crop;
//   const isOwner = owner?.ownerEmail === currentUserEmail;
//   const totalPrice = quantity * price_min;

//   // ------------------- JSX -------------------
//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Crop Image */}
//         <div className="md:w-1/2">
//           <img
//             src={image || 'https://via.placeholder.com/400x300'}
//             alt={title}
//             className="w-full h-96 object-cover rounded-lg shadow"
//           />
//         </div>




//         {/* Crop Details */}
//         <div className="md:w-1/2 flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{title}</h1>
//             <p className="text-gray-600 mb-2">Category: {category || 'General'}</p>
//             <p className="text-green-700 font-semibold mb-4">
//               Price: ${price_min} - ${price_max}
//             </p>
//             <p className="text-gray-700 mb-6">{description || 'No description provided.'}</p>
//           </div>

//           {!isOwner && (
//             <div className="flex flex-col gap-3">
//               <div className="flex gap-4 items-center">
//                 <button
//                   onClick={() => setShowForm(!showForm)}
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
//                 >
//                   Interest
//                 </button>

//                 <Link
//                   to="/all-crops"
//                   className="ml-auto text-green-600 hover:underline flex items-center"
//                 >
//                   &larr; Back to All Crops
//                 </Link>
//               </div>

//               {showForm && (
//                 <div className="mt-4 border p-4 rounded shadow bg-gray-50">
//                   <h3 className="font-semibold text-lg mb-3">Submit Your Interest</h3>
//                   {submitError && <p className="text-red-500 mb-2">{submitError}</p>}
//                   {submitSuccess && <p className="text-green-600 mb-2">{submitSuccess}</p>}

//                   <div className="mb-3">
//                     <label className="block mb-1 font-medium">Quantity (kg)</label>
//                     <input
//                       type="number"
//                       value={quantity}
//                       min={1}
//                       onChange={(e) => setQuantity(Number(e.target.value))}
//                       className="border p-2 w-full rounded"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="block mb-1 font-medium">Message</label>
//                     <input
//                       type="text"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder={`Interested in ${quantity} kg`}
//                       className="border p-2 w-full rounded"
//                     />
//                   </div>

//                   <p className="font-semibold mb-3">Total Price: ${totalPrice}</p>

//                   <button
//                     onClick={() => setConfirmModal(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     Submit Interest
//                   </button>



//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {confirmModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white p-6 rounded shadow max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4">Confirm Interest</h3>
//             <p>Are you sure you want to submit interest for {quantity} kg?</p>
//             <div className="mt-4 flex justify-end gap-3">
//               <button
//                 onClick={() => setConfirmModal(false)}
//                 className="px-4 py-2 rounded border"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Owner Section */}
//       {isOwner && (
//         <div className="mt-10">
//           <h2 className="text-2xl font-bold mb-4">Received Interests</h2>
//           {crop.interests && crop.interests.length > 0 ? (
//             <table className="w-full border border-gray-300 rounded">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border px-4 py-2">Buyer Name</th>
//                   <th className="border px-4 py-2">Quantity</th>
//                   <th className="border px-4 py-2">Message</th>
//                   <th className="border px-4 py-2">Status</th>
//                   <th className="border px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {crop.interests.map((interest) => (
//                   <tr key={interest._id}>
//                     <td className="border px-4 py-2">{interest.userName}</td>
//                     <td className="border px-4 py-2">{interest.quantity}</td>
//                     <td className="border px-4 py-2">{interest.message}</td>
//                     <td className="border px-4 py-2">{interest.status}</td>
//                     <td className="border px-4 py-2 flex gap-2">
//                       {interest.status === 'pending' && (
//                         <>
//                           <button
//                             disabled={interestActionLoading}
//                             onClick={() => handleInterestAction(interest._id, 'accepted')}
//                             className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                           >
//                             Accept
//                           </button>
//                           <button
//                             disabled={interestActionLoading}
//                             onClick={() => handleInterestAction(interest._id, 'rejected')}
//                             className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}
//                       {interest.status !== 'pending' && (
//                         <span className="text-gray-500 px-2 py-1">{interest.status}</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-500">No interests received yet.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CropDetails;













