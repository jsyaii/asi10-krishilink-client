




import { FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-base-content mt-10 text-white">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center ">

        
        <div className="flex flex-col items-center md:items-start space-y-2 gap-5 text-2xl">
          <div className="h-[70px] flex items-center gap-3 font-bold">
  <img
    src="/src/assets/logo.jpg"
    alt="Logo"
    className="h-full w-auto object-contain"
  />
  <p>Krishi <span className="text-green-600">Link</span></p>
</div>
          <nav className="flex flex-col space-y-1 text-sm font-semibold ">
            <Link to="/about" className="link link-hover hover:text-primary">About</Link>
            <Link to="/contact" className="link link-hover hover:text-primary">Contact</Link>
            <Link to="/privacy" className="link link-hover hover:text-primary">Privacy Policy</Link>
          </nav>
        </div>

        
        <div className="flex space-x-5 text-2xl">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-600">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-red-600">
            <FaPinterest />
          </a>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-center md:text-right text-sm opacity-75 font-semibold">
          © 2025 <span className="font-semibold text-green-600">KrishiLink</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
