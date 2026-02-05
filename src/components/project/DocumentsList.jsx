import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Folder } from 'lucide-react';

export default function DocumentsList({ documents = [] }) {
  const defaultDocuments = [
    { name: 'Project Brochure', url: '#' },
    { name: 'Floor Plans', url: '#' },
    { name: 'Payment Plan Details', url: '#' },
    { name: 'Fact Sheet', url: '#' }
  ];

  const displayDocuments = documents.length > 0 ? documents : defaultDocuments;

  if (displayDocuments.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
          <Folder className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Documents</h2>
          <p className="text-gray-500 text-sm">{displayDocuments.length} files available</p>
        </div>
      </div>

      <div className="space-y-2">
        {displayDocuments.map((doc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">PDF Document</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </a>
              <a
                href={doc.url}
                download
                className="w-9 h-9 rounded-full bg-amber-500 shadow-sm flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Download className="w-4 h-4 text-white" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}