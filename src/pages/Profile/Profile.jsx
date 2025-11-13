import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../../Firebase/firebase.config";


const auth = getAuth(app);

const Profile = () => {
  const user = auth.currentUser;
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        toast.success("✅ Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
           My Profile
        </h2>

        {user ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="flex flex-col items-center">
              <img
                src={photoURL || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-3"
              />
            </div>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400"
            />

            <input
              type="text"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={user.email}
              disabled
              className="w-full p-3 border border-green-300 rounded-xl bg-gray-100 cursor-not-allowed"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">No user logged in!</p>
        )}

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default Profile;
