import React, { useEffect, useState } from 'react';
import { storage } from '../appwrite/appwriteConfig';
// Static images (verify paths)
import img1 from '../assets/images/gallery1.jpg';
import img2 from '../assets/images/gallery2.jpg';
import img3 from '../assets/images/gallery3.jpg';

// Static image data with metadata
const staticImages = [
  { 
    url: img1, 
    id: 'static-1',
    title: 'Mediterranean Delight',
    description: 'Fresh vegetables and herbs with olive oil dressing',
    category: 'Healthy',
    dateTime: '2024-12-15T14:30:00'
  },
  { 
    url: img2, 
    id: 'static-2',
    title: 'Berry Parfait',
    description: 'Layers of yogurt, granola, and fresh berries',
    category: 'Breakfast',
    dateTime: '2024-12-18T09:15:00'
  },
  { 
    url: img3, 
    id: 'static-3',
    title: 'Grilled Salmon',
    description: 'Wild-caught salmon with lemon and herbs',
    category: 'Dinner',
    dateTime: '2024-12-20T18:45:00'
  },
];

const Gallery = () => {
  const [appwriteImages, setAppwriteImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await storage.listFiles('67d3d72e0033170ca6c4');
        
        const images = await Promise.all(
          response.files.map(async (file) => ({
            url: storage.getFileView('67d3d72e0033170ca6c4', file.$id).toString(),
            id: file.$id,
            isNew: true,
            title: file.name || 'New Upload',
            description: file.$createdAt ? `Uploaded on ${new Date(file.$createdAt).toLocaleDateString()}` : 'Recently added to our collection',
            category: file.customData?.category || 'Uncategorized',
            dateTime: file.$createdAt || new Date().toISOString()
          }))
        );
        
        setAppwriteImages(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const allImages = [...appwriteImages, ...staticImages.map(img => ({ ...img, isNew: false }))];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="w-full min-h-screen px-4 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-green-600 text-center mb-4">Food Gallery</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Explore our collection of delicious culinary creations, from appetizers to desserts
      </p>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
              <div className="w-full h-64 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : allImages.length === 0 ? (
        <div className="text-center text-gray-500 p-12 bg-white rounded-xl shadow">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">No images available</h3>
          <p>Be the first to upload your culinary masterpiece!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allImages.map((image) => (
            <div key={image.id} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="relative overflow-hidden h-72">
                {image.isNew && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2.5 py-1.5 rounded-full z-10 shadow-md">
                    New
                  </span>
                )}
                <img
                  src={image.url}
                  alt={image.title || "Food gallery item"}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.src = '/fallback.jpg'; // Add fallback image
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg">
                    {image.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {image.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span>{formatDate(image.dateTime)} at {formatTime(image.dateTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;