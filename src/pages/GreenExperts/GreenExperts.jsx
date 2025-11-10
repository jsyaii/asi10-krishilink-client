import React from "react";
import { motion } from "framer-motion";

const experts = [
  {
    id: 1,
    name: "Ava Green",
    specialization: "Indoor Plant Specialist",
    image: "https://i.ibb.co.com/1BQGyTW/portrait-man-growing-plants.jpg",
  },
  {
    id: 2,
    name: "Ethan Bloom",
    specialization: "Botanist & Eco Decor Expert",
    image: "https://i.ibb.co.com/JF7J5t9p/portrait-happy-female-gardener-holding-two-potted-plants.jpg",
  },
  {
    id: 3,
    name: "Lila Fern",
    specialization: "Succulent & Cactus Care Expert",
    image: "https://i.ibb.co.com/gZwsF7Qw/happily-asian-young-gardener-couple-wearing-apron-use-garden-equipment-laptop-computer-take-care.jpg",
  },
  {
    id: 4,
    name: "Noah Leaf",
    specialization: "Hydroponic Plant Specialist",
    image: "https://i.ibb.co.com/LXw1LzsJ/two-concentrated-gardeners-preparing-plants-pots-market-man-woman-blue-shirts-black-aprons-growing-h.jpg",
  },
];

const GreenExperts = () => {
  return (
    <div className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-800 mb-4"
        >
        🌿  Meet Our Green Experts 🌿
        </motion.h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Our passionate plant experts are here to help you make your home greener and healthier.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="card bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <figure>
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="h-56 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-semibold text-green-800">{expert.name}</h3>
                <p className="text-gray-500 text-sm">{expert.specialization}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreenExperts;
