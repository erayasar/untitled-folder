import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FiX, FiSearch } from 'react-icons/fi';
import { FilterState } from '../types/filter';

const categories = [
  { id: 'tours', name: 'TURLAR' },
  { id: 'tickets', name: 'BİLETLER' },
  { id: 'rent', name: 'KİRALAMA' },
  { id: 'transfer', name: 'TRANSFER' },
];

const filterOptionsByCategory = {
  tours: {
    theme: [
      { id: 'cultural-tour', name: 'Kültür Turu', count: 43 },
      { id: 'nature-tour', name: 'Doğa Turu', count: 43 },
      { id: 'historical-tour', name: 'Tarih Turu', count: 43 },
    ],
    activity: [
      { id: 'swimming', name: 'Yüzme', count: 43 },
      { id: 'hiking', name: 'Doğa Yürüyüşü', count: 43 },
      { id: 'paragliding', name: 'Yamaç Paraşütü', count: 43 },
    ],
  },
  tickets: {
    type: [
      { id: 'museum', name: 'Müze', count: 43 },
      { id: 'concert', name: 'Konser', count: 43 },
      { id: 'attraction', name: 'Aktivite', count: 43 },
    ],
  },
  rent: {
    vehicle: [
      { id: 'car', name: 'Araba', count: 43 },
      { id: 'bike', name: 'Bisiklet', count: 43 },
      { id: 'scooter', name: 'Scooter', count: 43 },
    ],
  },
  transfer: {
    type: [
      { id: 'airport', name: 'Havalimanı', count: 43 },
      { id: 'hotel', name: 'Otel', count: 43 },
      { id: 'custom', name: 'Özel Transfer', count: 43 },
    ],
  },
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterState) => void;
}

const FilterModal = ({ isOpen, onClose, onFilter }: FilterModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState('tours');
  const [filters, setFilters] = useState<FilterState>({
    category: 'tours',
    location: '',
    theme: [],
    activity: [],
    priceRange: 25000,
    startTime: '12:00',
    groupSize: 20,
    vehicle: [],
    features: [],
    type: [],
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilters(prev => ({
      ...prev,
      category: categoryId,
      theme: [],
      activity: [],
      vehicle: [],
      features: [],
    }));
  };

  const handleToggleFilter = (category: keyof FilterState, value: string) => {
    const currentValue = filters[category];
    if (Array.isArray(currentValue)) {
      setFilters(prev => ({
        ...prev,
        [category]: currentValue.includes(value)
          ? currentValue.filter(item => item !== value)
          : [...currentValue, value]
      }));
    }
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      category: '',
      location: '',
      theme: [],
      activity: [],
      priceRange: 25000,
      startTime: '12:00',
      groupSize: 20,
      vehicle: [],
      features: [],
      type: [],
    };

    setSelectedCategory('tours');
    setFilters(resetFilters);
    onFilter(resetFilters);
    onClose();
  };

  const handleSearch = () => {
    onFilter(filters);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-start justify-center min-h-screen pt-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

        <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex space-x-2 overflow-x-auto mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {selectedCategory === 'tours' && (
              <>
                <div className="mb-6">
                  <h3 className="text-gray-600 mb-2">Tema</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptionsByCategory.tours.theme.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleToggleFilter('theme', theme.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.theme.includes(theme.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-gray-600 mb-2">Activity <span className="text-xs text-gray-400">Select list</span></h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptionsByCategory.tours.activity.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => handleToggleFilter('activity', activity.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.activity.includes(activity.id)
                            ? 'bg-primary-500 text-white'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {activity.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedCategory === 'tickets' && (
              <div className="mb-6">
                <h3 className="text-gray-600 mb-2">Bilet Türü</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptionsByCategory.tickets.type.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleToggleFilter('type', type.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.theme.includes(type.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory === 'rent' && (
              <div className="mb-6">
                <h3 className="text-gray-600 mb-2">Araç Türü</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptionsByCategory.rent.vehicle.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => handleToggleFilter('vehicle', vehicle.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.vehicle.includes(vehicle.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {vehicle.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory === 'transfer' && (
              <div className="mb-6">
                <h3 className="text-gray-600 mb-2">Transfer Türü</h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptionsByCategory.transfer.type.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleToggleFilter('type', type.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.theme.includes(type.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-gray-600 mb-2">Fiyat Aralığı</h3>
              <input
                type="range"
                min="0"
                max="25000"
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">0 TL</span>
                <span className="text-sm text-gray-600">{filters.priceRange} TL</span>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-gray-200 rounded-lg text-gray-700"
              >
                Sıfırla
              </button>
              <button
                onClick={handleSearch}
                className="flex-1 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
              >
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FilterModal; 