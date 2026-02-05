import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LocationMap({ project }) {
  const lat = project.latitude || 25.0657;
  const lng = project.longitude || 55.1713;
  const locationParts = [project.subcommunity, project.community, project.area].filter(Boolean);

  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Location</h2>
            <p className="text-gray-500 text-sm">
              {locationParts.length > 0 ? locationParts.join(', ') : 'Dubai, UAE'}
            </p>
          </div>
        </div>
        
        <button
          onClick={openInMaps}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          <span className="hidden sm:inline">Get Directions</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Location Details */}
      {locationParts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.area && (
            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              {project.area}
            </span>
          )}
          {project.community && (
            <span className="px-3 py-1.5 bg-teal-50 rounded-full text-sm font-medium text-teal-700">
              {project.community}
            </span>
          )}
          {project.subcommunity && (
            <span className="px-3 py-1.5 bg-purple-50 rounded-full text-sm font-medium text-purple-700">
              {project.subcommunity}
            </span>
          )}
        </div>
      )}

      {/* Map */}
      <div className="rounded-xl overflow-hidden h-[350px] border border-gray-100">
        <MapContainer
          center={[lat, lng]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              <div className="text-center py-1">
                <p className="font-semibold">{project.name || 'Project Location'}</p>
                {locationParts.length > 0 && (
                  <p className="text-sm text-gray-500">{locationParts.join(', ')}</p>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
}