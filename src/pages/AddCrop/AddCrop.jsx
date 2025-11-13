import React, { useContext, useState } from "react";

import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";

const AddCrop = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first!");
      return;
    }

    const newCrop = {
      ...formData,
      pricePerUnit: Number(formData.pricePerUnit),
      quantity: Number(formData.quantity),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName || "Anonymous Farmer",
      },
      created_at: new Date(),
    };

    try {
      setLoading(true);
      const res = await fetch("https://krishilink-server-khaki.vercel.app/crops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCrop),
      });

      if (res.ok) {
        setSuccessMessage("Crop added successfully!");
        setFormData({
          name: "",
          type: "",
          pricePerUnit: "",
          unit: "",
          quantity: "",
          description: "",
          location: "",
          image: "",
        });

        setTimeout(() => navigate("/my-posts"), 1500);
      } else {
        alert("Failed to add crop. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error while adding crop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg border">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        Add New Crop
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block font-semibold mb-1">Crop Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter crop name"
            required
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
            <option value="Other">Other</option>
          </select>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Unit</option>
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="bag">bag</option>
            </select>
          </div>
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Estimated Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter quantity"
            required
          />
        </div>
 
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Short details about the crop"
            required
          ></textarea>
        </div>

        
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter location"
            required
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-success w-full mt-4"
        >
          {loading ? "Adding Crop..." : "Add Crop"}
        </button>

        {successMessage && (
          <p className="text-green-600 font-semibold text-center mt-3">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddCrop;
