import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-400 px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* App Name & Message */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-wide">MovieBase</h2>
          <p className="text-sm text-gray-400 italic">Your ultimate movie discovery platform.</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Browse Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Browse</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">TV Shows</a></li>
              <li><a href="#" className="hover:text-white transition">Movies</a></li>
              <li><a href="#" className="hover:text-white transition">New & Popular</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Media Center</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Account</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Newsletter</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded"
              >
                Subscribe
              </button>
            </form>

            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition hover:scale-110"><FaFacebookF /></a>
              <a href="#" className="hover:text-white transition hover:scale-110"><FaTwitter /></a>
              <a href="#" className="hover:text-white transition hover:scale-110"><FaInstagram /></a>
              <a href="#" className="hover:text-white transition hover:scale-110"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-6 border-t border-zinc-800">
          © {new Date().getFullYear()} MovieVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
