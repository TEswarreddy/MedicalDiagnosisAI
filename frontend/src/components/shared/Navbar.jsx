import React from 'react';
export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold p-2">Medical Diagnosis AI</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="/" className="hover:text-blue-400">Home</a></li>
          <li><a href="#" className="hover:text-blue-400">About</a></li>
          <li><a href="#" className="hover:text-blue-400">Services</a></li>
          <li><a href="#" className="hover:text-blue-400">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <MobileMenu />
      </div>
    </nav>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden relative">
      <button
        aria-label="Toggle Menu"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
      >
        {/* Hamburger icon */}
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg py-2 text-white z-10">
          <li>
            <a
              href="/"
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
