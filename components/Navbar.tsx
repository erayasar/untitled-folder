import { useState } from 'react';
import Link from 'next/link';
import FilterModal from './FilterModal';
import { FiMenu, FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FilterState } from '../types/filter';

interface NavbarProps {
  onFilter: (filters: FilterState) => void;
}

const Navbar = ({ onFilter }: NavbarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Sol Kısım - Logo ve Menü */}
          <div className="flex items-center">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-500 focus:outline-none"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <Link href="/" className="ml-4 font-bold text-xl text-primary-500">
              TravelApp
            </Link>
          </div>

          {/* Sağ Kısım - Favoriler, Sepet, Profil */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="text-gray-600 hover:text-primary-500">
              <FiHeart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-primary-500">
              <FiShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-primary-500">
              <FiUser className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Filtreleme Modal */}
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onFilter={onFilter}
      />
    </nav>
  );
};

export default Navbar; 