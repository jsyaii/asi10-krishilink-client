import React from 'react';
import { Link } from 'react-router';


const Blogs = () => {
 
  const blogs = [
    {
      id: 1,
      title: '5 Tips for Organic Farming',
      description:
        'Learn the top 5 techniques for organic farming that increase yield and reduce chemicals...',
      image: 'https://i.ibb.co.com/yFHj54WX/high-angle-plantation-with-sun-rays.jpg',
    },
    {
      id: 2,
      title: 'Seasonal Crops to Plant in Winter',
      description:
        'Discover the crops best suited for winter season and maximize your harvest this year...',
      image: 'https://i.ibb.co.com/jkZ9ftnB/freshly-harvested-carrot-garden.jpg',
    },
    {
      id: 3,
      title: 'How to Protect Your Crops from Pests',
      description:
        'A complete guide on natural ways to protect your crops from pests without using harmful chemicals...',
      image: 'https://i.ibb.co.com/n8LqC9cP/red-chili-pepper.jpg',
    },
    {
      id: 4,
      title: 'Improving Soil Health Naturally',
      description:
        'Tips and techniques for maintaining soil fertility and improving crop yield organically...',
      image: 'https://i.ibb.co.com/Z1v0t3nh/pumpkin-seeds-were-poured-from-sack-ground.jpg',
    },
    {
      id: 5,
      title: 'Water Management Techniques',
      description:
        'Effective ways to conserve water and irrigate your crops efficiently during dry seasons...',
      image: 'https://i.ibb.co.com/1BQGyTW/portrait-man-growing-plants.jpg',
    },
    {
      id: 6,
      title: 'Fertilizers and Composting Tips',
      description:
        'Learn how to create natural compost and use organic fertilizers for healthy crops...',
      image: 'https://i.ibb.co.com/Pv2n6KVJ/autumn-fruits-hanging-tree-branch-garden.jpg',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">
          Agro <span className="text-green-600">News</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest agriculture news and tips.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-500 mb-4">
                {blog.description}
              </p>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-green-600 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/blogs"
          className="btn btn-primary px-8 py-3 font-semibold"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
