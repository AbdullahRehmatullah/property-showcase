import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

import ImageGallery from '@/components/project/ImageGallery';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectDescription from '@/components/project/ProjectDescription';
import PaymentPlans from '@/components/project/PaymentPlans';
import AmenitiesGrid from '@/components/project/AmenitiesGrid';
import LocationMap from '@/components/project/LocationMap';
import DocumentsList from '@/components/project/DocumentsList';

export default function ProjectDetail() {
  // Sample project data - in production this would come from URL params + API
  const project = {
    name: 'Kalina',
    status: 'launched',
    starting_price: 6783043,
    currency: 'AED',
    developer_name: 'Union Properties',
    community: 'Dubai Motor City',
    subcommunity: 'Motor City',
    area: 'Dubai',
    latitude: 25.0657,
    longitude: 55.1713,
    description: `Kalina at Motor City is a complex of luxurious and contemporary that is part of the modern fabulous community located in the heart of the Motor City. The developer of this new project is a well-known company Union Properties PJSC. Kalina offers brand living is a mix of green spaces living with a blend of entertainment, lifestyle elements, along with easy access to major roads that offer easy access to other landmarks in the city.

The development offers a stunning collection of studios, 1, 2, and 3-bedroom apartments. A luxury investment-grade property with a plethora of green spaces, sports facilities, gym, spacious lounge area, and children's playrooms make the ultimate living experience. The fabulous community has everything you need to sit, relax and just chill. Unit layouts and living spaces include private terraces, modern kitchen layouts, marble floors and walls, including fitted wardrobes, modern features and fixtures in all the rooms with top-notch finishes. Plus, a stunning entryway leading into a beautifully designed modern fit. For purchase and investment inquiries feel free to contact Al Manzil Al Abyad L.L.C.`,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    amenities: [
      'Swimming Pool', 'Fitness Center', 'Landscaped Gardens', 'Covered Parking',
      '24/7 Security', 'Children Play Area', 'Jogging Track', 'Spa & Sauna',
      'Retail Outlets', 'Community Center', 'BBQ Area', 'Rooftop Terrace'
    ],
    payment_plans: [
      {
        name: 'Standard Plan',
        breakdowns: [
          { percentage: 10, milestone: 'Down Payment', date: '2025-06-30' },
          { percentage: 10, milestone: 'During Construction', date: '2025-12-31' },
          { percentage: 15, milestone: '1% per month', date: 'Jan 2025 - Jun 2025' },
          { percentage: 25, milestone: 'On Completion', date: '04 July 2025' },
          { percentage: 40, milestone: 'Post Handover', date: '40 months post completion' }
        ]
      },
      {
        name: '80/20 Plan',
        breakdowns: [
          { percentage: 20, milestone: 'Down Payment', date: 'On Booking' },
          { percentage: 60, milestone: 'During Construction', date: 'Monthly installments' },
          { percentage: 20, milestone: 'On Handover', date: 'At completion' }
        ]
      }
    ],
    documents: [
      { name: 'Project Brochure', url: '#' },
      { name: 'Floor Plans', url: '#' },
      { name: 'Fact Sheet', url: '#' }
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.name,
        text: `Check out ${project.name} - Starting from ${project.currency} ${project.starting_price?.toLocaleString()}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to={createPageUrl('Home')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Projects</span>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.print()}
                className="rounded-full"
              >
                <Printer className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="rounded-full gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Image Gallery */}
        <ImageGallery images={project.images} />

        {/* Project Header */}
        <ProjectHeader project={project} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectDescription 
              description={project.description} 
              developerName={project.developer_name}
            />
            <PaymentPlans plans={project.payment_plans} />
            <AmenitiesGrid amenities={project.amenities} />
            <LocationMap project={project} />
          </div>

          {/* Sidebar - 1 column */}
          <div>
            <DocumentsList documents={project.documents} />
          </div>
        </div>
      </div>
    </div>
  );
}