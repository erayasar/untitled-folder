import { FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface TourCardProps {
  id: number;
  image: string;
  discount?: number;
  rating: number;
  reviews: number;
  location: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
}

const TourCard = ({

  image,
  discount,
  rating,
  reviews,
  location,
  title,
  originalPrice,
  discountedPrice,
}: TourCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm z-10">
            {discount}% OFF
          </div>
        )}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full z-10">
          <FiHeart className="h-5 w-5" />
        </button>
        
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm">{rating}</span>
          <span className="text-sm text-gray-500">({reviews})</span>
          <span className="text-gray-400 mx-2">•</span>
          <span className="text-sm text-gray-500">{location}</span>
        </div>
        
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        
        <div className="flex items-center">
          <span className="text-gray-400 line-through text-sm">TL {originalPrice}</span>
          <span className="text-xl font-bold ml-2 text-primary-500">TL {discountedPrice}</span>
        </div>
        
        <button className="mt-3 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
          Book now
        </button>
      </div>
    </div>
  );
};

export default TourCard; 