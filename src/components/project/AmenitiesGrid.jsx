import React from 'react';
import { motion } from 'framer-motion';
import {
  Waves, Dumbbell, TreePine, Car, Shield, Wifi,
  UtensilsCrossed, Baby, Dog, Bike, Coffee, Building,
  Sparkles, Wind, Sun, Droplets, Users, Heart,
  Monitor, Music, Gamepad2, BookOpen, ShoppingBag, Plane
} from 'lucide-react';

const amenityIcons = {
  'pool': Waves,
  'swimming pool': Waves,
  'gym': Dumbbell,
  'fitness': Dumbbell,
  'fitness center': Dumbbell,
  'garden': TreePine,
  'park': TreePine,
  'landscaped gardens': TreePine,
  'parking': Car,
  'covered parking': Car,
  'security': Shield,
  '24/7 security': Shield,
  'cctv': Shield,
  'wifi': Wifi,
  'internet': Wifi,
  'restaurant': UtensilsCrossed,
  'dining': UtensilsCrossed,
  'kids area': Baby,
  'children play area': Baby,
  'playground': Baby,
  'pet friendly': Dog,
  'cycling': Bike,
  'jogging track': Bike,
  'cafe': Coffee,
  'coffee shop': Coffee,
  'retail': Building,
  'shops': ShoppingBag,
  'spa': Sparkles,
  'sauna': Wind,
  'steam room': Wind,
  'rooftop': Sun,
  'terrace': Sun,
  'jacuzzi': Droplets,
  'community': Users,
  'clubhouse': Users,
  'health club': Heart,
  'business center': Monitor,
  'co-working': Monitor,
  'entertainment': Music,
  'cinema': Music,
  'game room': Gamepad2,
  'library': BookOpen,
  'reading room': BookOpen,
  'airport': Plane,
  'default': Sparkles
};

const getAmenityIcon = (amenity) => {
  const lowerAmenity = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(amenityIcons)) {
    if (lowerAmenity.includes(key)) {
      return icon;
    }
  }
  return amenityIcons.default;
};

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
      className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facilities & Amenities</h2>
          <p className="text-gray-500 text-sm">{displayAmenities.length} world-class amenities</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayAmenities.map((amenity, idx) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-teal-50 hover:to-emerald-50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-110 transition-all">
                <Icon className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {amenity}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}