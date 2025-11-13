import React, { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const InterestForm = ({ crop }) => {
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get price from the crop data
  const pricePerUnit = crop?.price || crop?.price_per_unit || 0;
  const totalPrice = quantity > 0 ? quantity * pricePerUnit : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity < 1) {
      alert("❌ Quantity must be at least 1");
      return;
    }
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);

    const interestData = {
      cropId: crop._id,
      userEmail: user?.email,
      userName: user?.displayName || "Anonymous",
      quantity: Number(quantity),
      message,
      totalPrice,
    };

    try {
      const res = await fetch("https://krishilink-server-khaki.vercel.app/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interestData),
      });

      if (!res.ok) throw new Error("Failed to submit interest");

      alert("✅ Interest submitted successfully!");
      setQuantity("");
      setMessage("");
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting interest:", error);
      alert("❌ Failed to submit interest.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        Send Interest
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block mb-1 font-semibold">Quantity (kg)</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Write your message to the owner..."
            rows={3}
          ></textarea>
        </div>

        {/* Price Info */}
        <div className="flex justify-between items-center border-t pt-3 font-semibold text-lg">
          <span>Price per Unit:</span>
          <span className="text-green-700">৳ {pricePerUnit}</span>
        </div>

        {/* Total Price */}
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Price:</span>
          <span className="text-green-700">
            ৳ {totalPrice.toLocaleString()}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-success w-full mt-3"
        >
          {isSubmitting ? "Submitting..." : "Submit Interest"}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Confirm Submission
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to send interest for{" "}
              <b>{quantity}</b> units (Total: <b>৳{totalPrice}</b>)?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmSubmit}
                className="btn btn-success"
                disabled={isSubmitting}
              >
                Yes, Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestForm;
