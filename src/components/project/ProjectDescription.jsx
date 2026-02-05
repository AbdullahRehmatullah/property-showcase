import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

export default function ProjectDescription({ description, developerName }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultDescription = `Experience the epitome of luxury living in this exceptional development. 
  
Designed with meticulous attention to detail, this project offers residents an unparalleled lifestyle with world-class amenities, stunning architectural design, and premium finishes throughout.

Located in one of the most sought-after neighborhoods, residents will enjoy easy access to major attractions, business districts, and leisure destinations. The development features spacious layouts, floor-to-ceiling windows, and private balconies that offer breathtaking views.

Every aspect of this community has been thoughtfully planned to provide the ultimate living experience, from the landscaped gardens and recreational facilities to the secure, family-friendly environment.`;

  const displayDescription = description || defaultDescription;
  const shouldTruncate = displayDescription.length > 300;
  const truncatedText = shouldTruncate && !isExpanded 
    ? displayDescription.slice(0, 300) + '...' 
    : displayDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">About This Project</h2>
          {developerName && (
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <Building2 className="w-3 h-3" /> by {developerName}
            </p>
          )}
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {truncatedText}
        </p>
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}