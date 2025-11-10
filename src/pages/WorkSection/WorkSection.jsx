import React from 'react';
import { FaUpload, FaLeaf, FaShoppingCart, FaSmile } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUpload size={30} className="text-green-600" />,
    title: 'Post Your Crop',
    description: 'Farmers can post their crops with all details including price, quantity, and images.',
  },
  {
    icon: <FaLeaf size={30} className="text-green-600" />,
    title: 'Browse Crops',
    description: 'Buyers can browse through all available crops with detailed information.',
  },
  {
    icon: <FaShoppingCart size={30} className="text-green-600" />,
    title: 'Place Order',
    description: 'Buyers can contact sellers and place orders directly for the crops they need.',
  },
  {
    icon: <FaSmile size={30} className="text-green-600" />,
    title: 'Enjoy Hassle-Free Trading',
    description: 'Farmers and buyers connect directly, ensuring fresh produce and better prices.',
  },
];

const WorkSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">How <span className="text-green-600">KrishiLink</span> Works</h2>
        <p className="text-gray-600 mt-2">A simple step-by-step guide to buying and selling crops.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
