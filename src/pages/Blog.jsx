import React, { useEffect, useState } from 'react';
import { account, databases } from '../appwrite/appwriteConfig'; // Adjust imports if needed
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your actual database and collection IDs
        const response = await databases.listDocuments('DATABASE_ID', 'COLLECTION_ID');
        setPosts(response.documents);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`); // Dynamic route for full post
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-16">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-12">
        Our Latest Blog Posts
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading blogs...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">No blog posts available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              <img
                src={post.imageURL || '/fallback.jpg'} // Use a fallback image if none
                alt={post.title}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + '...' : post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>By {post.author || 'Admin'}</span>
                  <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => handleReadMore(post.$id)}
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
