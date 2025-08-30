'use client';

import { useEffect, useState } from 'react';
import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';

// FarmerDashboard Page
export default function FarmerDashboard() {
  useEffect(() => {
    document.title = "Farmer Dashboard - Upload Products";
  }, []);

  // Hero Slider
  const slides = [
    { image: '/image/cooperative.png', caption: "Partnership with Cooperatives: Better Products, Fair Prices" },
    { image: '/image/tomatoes.png', caption: "Get the best price for your tomatoes by reaching a wide audience" },
    { image: '/image/fruits.png', caption: "A trusted partner in your success" },
    { image: '/image/chicken.png', caption: "Guaranteed fresh and delivered on time." },
    { image: '/image/cabbage.png', caption: "Source the freshest cabbage" },
    { image: '/image/cow.png', caption: "Find the perfect breed for dairy, beef, or breeding" },
    { image: '/image/watermelon.png', caption: "A reliable partner for your harvest" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Header Component
  const Header = () => (
    <header className=" bg-[#1C2340] text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">🌾 Agribridge</div>
      <div className="flex items-center space-x-6">
        <nav className="space-x-6">
          <Link href="/farmer">Home</Link>
          <Link href="/help">Help</Link>
          <Link href="/farmer/myaccount">My Account</Link>
          <Link href="/farmer/contact">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4 ml-4">
          <button className="relative">
            <Bell className="w-5 h-5 hover:text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2" />
          </button>
          <button>
            <Settings className="w-5 h-5 hover:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );

  // Hero Slider Component
  const HeroSlider = () => (
    <div className="relative w-full h-screen overflow-hidden rounded-b-3xl shadow-xl">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={slide.caption}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute bottom-24 md:bottom-14 left-0 right-0 px-4 text-center z-20">
        <p className="text-white text-xl md:text-2xl font-semibold max-w-3xl mx-auto drop-shadow-lg">
          {slides[currentSlide].caption}
        </p>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors duration-300
              ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );

  // InfoCard Component
  function InfoCardComponent() {
    return (
      <section className="relative w-full py-16 px-4 bg-gray-100 font-inter">
        <div className="bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto shadow-2xl">
          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/image/farmer.png"
                alt="Smiling African Farmer"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Empowering Farmers</h2>
            <p className="text-gray-700 text-lg mb-4">
              <strong>Agribridge</strong> helps farmers get fair prices by connecting them directly to buyers,
              cutting out middlemen and reducing overpricing.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Our platform ensures fast, reliable deliveries so your products reach the market fresh and on time.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              We empower cooperatives to track, manage, and celebrate their impact, making agriculture more rewarding
              for everyone.
            </p>
            <Link href="/farmer/upload">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Upload Product
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ProductGrid Component (Dynamic API)
  const ProductGrid = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch('/api/farmer/productGrid');
          const data = await res.json();
          if (data.success) setProducts(data.products);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);

    if (loading) return <p className="text-center py-8">Loading products...</p>;
    if (!products.length) return <p className="text-center py-8">No products uploaded yet.</p>;

    return (
      <section className="relative w-full py-16 px-4 bg-gray-100 font-inter">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Your Uploaded Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((card) => (
              <div key={card.id} className="bg-white rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
                <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-gray-600 font-medium">{card.description}</p>
                  <p className="text-gray-600 font-medium">{card.time}</p>
                  <p className="text-gray-600 font-medium">{card.price}</p>
                  <p className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg">
                    Available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Footer Component
  const Footer = () => (
    <footer className="w-full  bg-[#1C2340] text-white py-12 px-4 font-inter rounded-t-3xl mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">© 2024 Agribridge. Empowering African Farmers.</p>
        <div className="flex space-x-6 text-green-400 font-semibold mb-2">
          <a href="/farmer/contact" className="hover:text-white transition-colors">Contact</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
        </div>
        <p className="text-gray-400 text-sm">Connecting farmers to fair markets and fast deliveries.</p>
        <p className="text-gray-400 text-sm mt-1">Location: Rwanda</p>
      </div>
    </footer>
  );

  return (
    <>
      <Header />
      <div className="font-inter bg-gray-200">
        <div className="py-12 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            See where your product goes
          </h1>
        </div>
        <HeroSlider />
        <InfoCardComponent />
        <ProductGrid />
        <Footer />
      </div>
    </>
  );
}
