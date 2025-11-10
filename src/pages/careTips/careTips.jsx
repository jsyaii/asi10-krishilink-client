import React from "react";
import { Leaf, Sun, Droplet } from "lucide-react"; // nice nature icons

const careTips = [
  {
    id: 1,
    icon: <Droplet size={30} />,
    title: "Watering",
    description:
      "Water your plants regularly, but don’t overdo it. Check the top inch of soil—if it feels dry, it’s time to water.",
  },
  {
    id: 2,
    icon: <Sun size={30} />,
    title: "Sunlight",
    description:
      "Most indoor plants prefer indirect sunlight. Place them near windows with filtered light for optimal growth.",
  },
  {
    id: 3,
    icon: <Leaf size={30} />,
    title: "Fertilizing",
    description:
      "Feed your plants every 4–6 weeks during the growing season using a balanced, water-soluble fertilizer.",
  },
];

const PlantCareTips = () => {
  return (
    <section className="bg-green-50 py-12 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        🌱 Krishi Care Tips
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {careTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-center border border-green-100"
          >
            <div className="text-green-600 mb-4 flex justify-center">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              {tip.title}
            </h3>
            <p className="text-gray-600 text-sm">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlantCareTips;
