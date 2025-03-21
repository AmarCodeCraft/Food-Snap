import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero_image.jpg';
import { ArrowRight, UtensilsCrossed, Camera, Users, Heart } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Set loaded state after a small delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-green-500" />,
      title: "Share Your Dishes",
      description: "Upload high-quality photos of your culinary creations"
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8 text-green-500" />,
      title: "Find Inspiration",
      description: "Discover amazing recipes and food presentation ideas"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Join the Community",
      description: "Connect with food lovers and chefs from around the world"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero Section with Parallax */}
      <div 
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `scale(1.1) translateY(${scrollPosition * 0.2}px)`,
            filter: 'brightness(0.7)',
          }}
        />

        {/* Content Overlay with Staggered Animation */}
        <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16 z-10">
          <div className="max-w-4xl">
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Capture Your <span className="text-green-400">Culinary</span> Journey
            </h1>
            
            <p 
              className={`text-base sm:text-xl text-gray-100 mb-8 max-w-lg transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Share your food adventures, discover amazing recipes, and connect with a community of passionate food enthusiasts from around the world.
            </p>
            
            <div 
              className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <button 
                onClick={() => navigate('/UploadSnap')}
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Uploading
                <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={() => navigate('/Gallery')}
                className="bg-white/20 backdrop-blur hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Explore Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Food Snap?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            The perfect platform for food enthusiasts, photographers, and chefs to showcase their culinary masterpieces.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="mb-4 p-4 bg-green-50 inline-block rounded-lg group-hover:bg-green-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial/Stats Section */}
      <div className="py-16 px-6 sm:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Food Photos" },
              { number: "5K+", label: "Happy Users" },
              { number: "1K+", label: "Unique Recipes" },
              { number: "150+", label: "Countries" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 sm:px-10 lg:px-16 bg-gradient-to-r from-green-600 to-green-700 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to showcase your food?</h2>
          <p className="text-lg text-green-100 mb-8">Join our community of food enthusiasts today and start sharing your culinary creations.</p>
          <button 
            onClick={() => navigate('/SignUp')}
            className="bg-white text-green-600 hover:bg-green-50 font-medium px-8 py-3 rounded-full inline-flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Heart size={18} />
            Join Food Snap
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;