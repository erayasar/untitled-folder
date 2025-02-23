import { useState } from 'react';
import Navbar from '../components/Navbar';
import TourCard from '../components/TourCard';
import { FilterState } from '../types/filter';

const allTours = [
  {
    id: 1,
    image: "/images/kapadokya-balon-turu.jpg",
    discount: 30,
    rating: 4.3,
    reviews: 20,
    location: "Kapadokya/Nevşehir",
    title: "Kapadokya Balon Turu ve Kültür Gezisi",
    originalPrice: 4500,
    discountedPrice: 3150,
    category: 'tours',
    theme: ['cultural-tour', 'nature-tour'],
    activity: ['paragliding'],
  },
  {
    id: 2,
    image: "/images/images1.webp",
    discount: 25,
    rating: 4.7,
    reviews: 45,
    location: "Antalya/Kaleiçi",
    title: "Antalya Tekne Turu ve Antik Kent Gezisi",
    originalPrice: 2800,
    discountedPrice: 2100,
    category: 'tours',
    theme: ['historical-tour'],
    activity: ['swimming'],
  },
  {
    id: 3,
    image: "/images/Pamukkale.jpg",
    discount: 20,
    rating: 4.5,
    reviews: 32,
    location: "Pamukkale/Denizli",
    title: "Pamukkale Travertenleri",
    originalPrice: 1900,
    discountedPrice: 1520,
    category: 'tickets',
    type: ['attraction'],
  },
  {
    id: 4,
    image: "/images/oludeniz.webp",
    discount: 15,
    rating: 4.6,
    reviews: 28,
    location: "Fethiye/Muğla",
    title: "Ölüdeniz Yamaç Paraşütü ve Tekne Turu",
    originalPrice: 3500,
    discountedPrice: 2975,
    category: 'tours',
    theme: ['nature-tour'],
    activity: ['paragliding', 'swimming'],
  },
  {
    id: 5,
    image: "/images/topkapi.jpg",
    discount: 10,
    rating: 4.8,
    reviews: 15,
    location: "İstanbul/Sultanahmet",
    title: "Sultanahmet Müze Giriş Bileti",
    originalPrice: 400,
    discountedPrice: 360,
    category: 'tickets',
    type: ['museum'],
  },
  {
    id: 6,
    image: "/images/rent.jpeg",
    discount: 20,
    rating: 4.4,
    reviews: 23,
    location: "Antalya",
    title: "Günlük Araç Kiralama",
    originalPrice: 1200,
    discountedPrice: 960,
    category: 'rent',
    vehicle: ['car'],
  },
  {
    id: 7,
    image: "/images/otel.jpg",
    discount: 0,
    rating: 4.9,
    reviews: 56,
    location: "İstanbul",
    title: "Havalimanı - Otel Transfer",
    originalPrice: 800,
    discountedPrice: 800,
    category: 'transfer',
    type: ['airport'],
  },
];

export default function Home() {
  const [filteredTours, setFilteredTours] = useState(allTours);

  const handleFilter = (filters: FilterState) => {
    let results = allTours;

    if (filters.category) {
      results = results.filter(tour => tour.category === filters.category);

      switch (filters.category) {
        case 'tours':
          if (filters.theme.length > 0) {
            results = results.filter(tour => 
              filters.theme.some(theme => tour.theme?.includes(theme))
            );
          }
          if (filters.activity.length > 0) {
            results = results.filter(tour => 
              filters.activity.some(activity => tour.activity?.includes(activity))
            );
          }
          break;
        case 'tickets':
          if (filters.type.length > 0) {
            results = results.filter(tour => 
              filters.type.some(type => tour.type?.includes(type))
            );
          }
          break;
        case 'rent':
          if (filters.vehicle.length > 0) {
            results = results.filter(tour => 
              filters.vehicle.some(vehicle => tour.vehicle?.includes(vehicle))
            );
          }
          break;
        case 'transfer':
          if (filters.type.length > 0) {
            results = results.filter(tour => 
              filters.type.some(type => tour.type?.includes(type))
            );
          }
          break;
      }
    }

    if (filters.location) {
      results = results.filter(tour => 
        tour.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange) {
      results = results.filter(tour => 
        tour.discountedPrice <= filters.priceRange
      );
    }

    setFilteredTours(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onFilter={handleFilter} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {filteredTours.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Seçilen filtrelere uygun tur bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 