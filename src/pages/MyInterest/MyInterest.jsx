import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io("https://krishilink-server-khaki.vercel.app");

const MyInterests = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterests = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `https://krishilink-server-khaki.vercel.app/interests?userEmail=${user.email}`
      );
      const data = await res.json();
      setInterests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();

    socket.on("interestUpdated", ({ interestId, status }) => {
      setInterests((prev) =>
        prev.map((i) => (i._id === interestId ? { ...i, status } : i))
      );
      toast.info(`Interest ${status}!`);
    });

    return () => socket.off("interestUpdated");
  }, [user]);

  const handleCancelInterest = async (cropId, interestId) => {
    try {
      await fetch(
        `https://krishilink-server-khaki.vercel.app/crops/${cropId}/interest/${interestId}`,
        { method: "DELETE" }
      );
      setInterests((prev) => prev.filter((i) => i._id !== interestId));
      toast.success("Interest canceled!");
    } catch (err) {
      toast.error("Failed to cancel interest");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!interests.length)
    return <p className="text-center mt-10 text-gray-500">No interests yet.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {["Crop", "Owner", "Quantity", "Message", "Status", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-gray-600 font-semibold text-sm"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {interests.map((i) => (
            <tr
              key={i._id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-gray-700 font-medium">{i.cropName}</td>
              <td className="px-6 py-4 text-gray-600">{i.ownerName}</td>
              <td className="px-6 py-4 text-gray-600">{i.quantity}</td>
              <td className="px-6 py-4 text-gray-600">{i.message}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    i.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : i.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {i.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {i.status === "pending" && (
                  <button
                    onClick={() => handleCancelInterest(i.cropId, i._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyInterests;





// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
// import { toast } from "react-toastify";
// import { io } from "socket.io-client";

// const socket = io("https://krishilink-server-khaki.vercel.app"); // connect to server

// const MyInterests = () => {
//   const { user } = useContext(AuthContext);
//   const [interests, setInterests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchInterests = async () => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`https://krishilink-server-khaki.vercel.app/interests?userEmail=${user.email}`);
//       const data = await res.json();
//       setInterests(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInterests();

//     // ---------------- Listen to real-time updates ----------------
//     socket.on('interestUpdated', ({ interestId, status }) => {
//       setInterests(prev =>
//         prev.map(i => (i._id === interestId ? { ...i, status } : i))
//       );
//       toast.info(`Interest ${status}!`);
//     });

//     return () => socket.off('interestUpdated');
//   }, [user]);

//   const handleCancelInterest = async (cropId, interestId) => {
//     try {
//       await fetch(`https://krishilink-server-khaki.vercel.app/crops/${cropId}/interest/${interestId}`, {
//         method: "DELETE",
//       });
//       setInterests(prev => prev.filter(i => i._id !== interestId));
//       toast.success("Interest canceled!");
//     } catch (err) {
//       toast.error("Failed to cancel interest");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!interests.length) return <p>No interests yet.</p>;

//   return (
//     <table className="w-full border">
//       <thead>
//         <tr>
//           <th>Crop</th>
//           <th>Owner</th>
//           <th>Quantity</th>
//           <th>Message</th>
//           <th>Status</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {interests.map(i => (
//           <tr key={i._id}>
//             <td>{i.cropName}</td>
//             <td>{i.ownerName}</td>
//             <td>{i.quantity}</td>
//             <td>{i.message}</td>
//             <td>{i.status}</td>
//             <td>
//               {i.status === 'pending' && (
//                 <button onClick={() => handleCancelInterest(i.cropId, i._id)}>
//                   Cancel
//                 </button>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default MyInterests;



// import { AuthContext } from "../../provider/AuthProvider";
// import { toast } from "react-toastify";

// const MyInterests = () => {
//   const { user } = useContext(AuthContext);
//   const [interests, setInterests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState("cropName"); // default sort
//   const [actionLoading, setActionLoading] = useState(false);

//   // ---------------- Fetch Interests ----------------
//   const fetchInterests = async () => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`https://krishilink-server-khaki.vercel.app/interests?userEmail=${user.email}`);
//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Failed to fetch interests");
//       }
//       const data = await res.json();
//       setInterests(data);
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInterests();

//     // ---------------- Polling every 5 seconds ----------------
//     const interval = setInterval(() => {
//       fetchInterests();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [user]);

//   // ---------------- Cancel Interest ----------------
//   const handleCancelInterest = async (cropId, interestId) => {
//     if (!window.confirm("Are you sure you want to cancel this interest?")) return;

//     setActionLoading(true);
//     try {
//       const res = await fetch(`https://krishilink-server-khaki.vercel.app/crops/${cropId}/interest/${interestId}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Failed to cancel interest");
//       }

//       // Remove canceled interest from UI instantly
//       setInterests(prev => prev.filter(i => i._id !== interestId));
//       toast.success("Interest canceled successfully!");
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ---------------- Sorting ----------------
//   const sortedInterests = [...interests].sort((a, b) => {
//     if (sortBy === "quantity") return a.quantity - b.quantity;
//     if (sortBy === "status") return a.status.localeCompare(b.status);
//     return a.cropName.localeCompare(b.cropName); // default
//   });

//   // ---------------- Render ----------------
//   if (loading) return <p className="text-center mt-10">Loading your interests...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
//   if (!interests.length) return <p className="text-center mt-10">No interests submitted yet.</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">My Interests</h2>

//       {/* Sorting */}
//       <div className="mb-4 flex gap-4 items-center">
//         <span>Sort by:</span>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="cropName">Crop Name</option>
//           <option value="quantity">Quantity</option>
//           <option value="status">Status</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="w-full border border-gray-300 rounded">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Crop Name</th>
//             <th className="border px-4 py-2">Owner</th>
//             <th className="border px-4 py-2">Quantity</th>
//             <th className="border px-4 py-2">Message</th>
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedInterests.map((interest) => (
//             <tr key={interest._id}>
//               <td className="border px-4 py-2">{interest.cropName}</td>
//               <td className="border px-4 py-2">{interest.ownerName}</td>
//               <td className="border px-4 py-2">{interest.quantity}</td>
//               <td className="border px-4 py-2">{interest.message}</td>
//               <td
//                 className={`border px-4 py-2 font-semibold ${
//                   interest.status === "accepted"
//                     ? "text-green-600"
//                     : interest.status === "rejected"
//                     ? "text-red-600"
//                     : "text-gray-700"
//                 }`}
//               >
//                 {interest.status}
//               </td>
//               <td className="border px-4 py-2">
//                 {interest.status === "pending" ? (
//                   <button
//                     disabled={actionLoading}
//                     onClick={() =>
//                       handleCancelInterest(interest.cropId, interest._id)
//                     }
//                     className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Cancel
//                   </button>
//                 ) : (
//                   <span className="text-gray-500">—</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyInterests;
