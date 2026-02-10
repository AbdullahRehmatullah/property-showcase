import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AmenitiesGrid({ amenities = [] }) {
  const defaultAmenities = [
    'Swimming Pool', 'Fitness Center', 'Landscaped Gardens', 'Covered Parking',
    '24/7 Security', 'Children Play Area', 'Jogging Track', 'Spa & Sauna',
    'Retail Outlets', 'Community Center', 'BBQ Area', 'Rooftop Terrace'
  ];

  const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Facilities & Amenities</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {displayAmenities.map((amenity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.02 }}
            className="px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {amenity}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}