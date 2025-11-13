import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";


const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myCrops, setMyCrops] = useState([]);
  const [editingCrop, setEditingCrop] = useState(null);

  const url = `https://krishilink-server-khaki.vercel.app/crops?email=${user?.email}`;

  // ✅ Fetch logged-in user's crops
  useEffect(() => {
    if (user?.email) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setMyCrops(data))
        .catch((err) => console.error(err));
    }
  }, [user, url]);

  // ✅ Delete crop
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this crop?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://krishilink-server-khaki.vercel.app/crops/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setMyCrops(myCrops.filter((crop) => crop._id !== id));
            Swal.fire("Deleted!", "Your crop has been deleted.", "success");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // ✅ Update crop
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseFloat(form.pricePerUnit.value),
      unit: form.unit.value,
      quantity: parseFloat(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    fetch(`https://krishilink-server-khaki.vercel.app/crops/${editingCrop._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then(() => {
        setMyCrops((prev) =>
          prev.map((crop) =>
            crop._id === editingCrop._id ? { ...crop, ...updated } : crop
          )
        );
        Swal.fire("Updated!", "Crop information updated successfully!", "success");
        setEditingCrop(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        🌾 My Crops ({myCrops.length})
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Crop</th>
              <th>Type</th>
              <th>Price/unit</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCrops.map((crop, index) => (
              <tr key={crop._id || index}>
                <td>{index + 1}</td>
                <td>{crop.name}</td>
                <td>{crop.type}</td>
                <td>{crop.pricePerUnit} / {crop.unit}</td>
                <td>{crop.quantity}</td>
                <td>{crop.location}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setEditingCrop(crop)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(crop._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      {editingCrop && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-4">Edit Crop</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  defaultValue={editingCrop.name}
                  className="input input-bordered w-full"
                  placeholder="Crop name"
                  required
                />
                <input
                  type="text"
                  name="type"
                  defaultValue={editingCrop.type}
                  className="input input-bordered w-full"
                  placeholder="Type"
                  required
                />
                <input
                  type="number"
                  name="pricePerUnit"
                  defaultValue={editingCrop.pricePerUnit}
                  className="input input-bordered w-full"
                  placeholder="Price per unit"
                  required
                />
                <input
                  type="text"
                  name="unit"
                  defaultValue={editingCrop.unit}
                  className="input input-bordered w-full"
                  placeholder="Unit"
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  defaultValue={editingCrop.quantity}
                  className="input input-bordered w-full"
                  placeholder="Quantity"
                  required
                />
                <input
                  type="text"
                  name="location"
                  defaultValue={editingCrop.location}
                  className="input input-bordered w-full"
                  placeholder="Location"
                  required
                />
              </div>

              <textarea
                name="description"
                defaultValue={editingCrop.description}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                required
              />
              <input
                type="text"
                name="image"
                defaultValue={editingCrop.image}
                className="input input-bordered w-full"
                placeholder="Image URL"
                required
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingCrop(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPosts;
