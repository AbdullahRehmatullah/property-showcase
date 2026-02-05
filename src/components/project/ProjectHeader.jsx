import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, CheckCircle, Clock, XCircle } from 'lucide-react';

const statusConfig = {
  available: {
    label: 'Available',
    icon: CheckCircle,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500'
  },
  launched: {
    label: 'Launched',
    icon: Clock,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500'
  },
  sold_out: {
    label: 'Sold Out',
    icon: XCircle,
    className: 'bg-gray-100 text-gray-600 border-gray-200',
    dotColor: 'bg-gray-400'
  }
};

export default function ProjectHeader({ project }) {
  const status = statusConfig[project.status] || statusConfig.available;
  const StatusIcon = status.icon;

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: project.currency || 'AED',
      maximumFractionDigits: 0
    }).format(price);
  };

  const locationParts = [project.subcommunity, project.community, project.area].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 py-6"
    >
      <div className="space-y-4">
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${status.className}`}>
          <span className={`w-2 h-2 rounded-full ${status.dotColor} animate-pulse`} />
          <span className="font-medium text-sm">{status.label}</span>
        </div>

        {/* Project Name */}
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          {project.name || 'Project Name'}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-teal-600" />
          <span className="text-lg">
            {locationParts.length > 0 ? locationParts.join(' • ') : 'Location not specified'}
          </span>
        </div>

        {/* Developer */}
        {project.developer_name && (
          <div className="flex items-center gap-2 text-gray-500">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">Developed by <span className="font-medium text-gray-700">{project.developer_name}</span></span>
          </div>
        )}
      </div>

      {/* Price Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-5 text-white shadow-lg shadow-teal-600/20"
      >
        <p className="text-teal-100 text-sm font-medium mb-1">Starting from</p>
        <p className="text-3xl lg:text-4xl font-bold tracking-tight">
          {formatPrice(project.starting_price)}
        </p>
        <p className="text-teal-100 text-sm mt-2">*Price subject to change</p>
      </motion.div>
    </motion.div>
  );
}