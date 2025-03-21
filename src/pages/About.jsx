import React from 'react';
import aboutImage from '../assets/about_image.jpg'; // Replace with your actual image

function About() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12 bg-gray-50">
      {/* Image Section */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src={aboutImage}
          alt="Delicious food"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 md:pl-10">
        <h2 className="text-4xl font-bold text-green-600 mb-4">Join the FoodSnap Family</h2>
        <p className="text-lg text-gray-700 mb-4">Share, discover, savor!</p>
        <p className="text-gray-700 mb-4">
          FoodSnap is a vibrant platform where food enthusiasts in Patna can upload, share, and explore
          mouth-watering images of their favorite dishes. Whether you're a home cook or a professional
          chef, our community celebrates culinary creativity.
        </p>
        <p className="text-gray-700 mb-4">
          Tag your uploads with relevant categories, add enticing descriptions, and inspire fellow
          food lovers. With seamless authentication and secure storage, FoodSnap makes it easy to
          connect with others who share your passion for food. Dive into a world of flavors and
          creativity today!
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition">
          Get in Touch
        </button>
      </div>
    </div>
  );
}

export default About;
