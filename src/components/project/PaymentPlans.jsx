import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check } from 'lucide-react';

export default function PaymentPlans({ plans = [] }) {
  const [activePlan, setActivePlan] = useState(0);

  const defaultPlans = [
    {
      name: 'Standard Plan',
      breakdowns: [
        { percentage: 10, milestone: 'Down Payment', date: 'On Booking' },
        { percentage: 10, milestone: 'During Construction', date: 'Within 30 days' },
        { percentage: 15, milestone: 'Construction Progress', date: 'Jan 2025 - Jun 2025' },
        { percentage: 25, milestone: 'On Completion', date: 'Jul 2025' },
        { percentage: 40, milestone: 'Post Handover', date: '1% per month' }
      ]
    },
    {
      name: 'Extended Plan',
      breakdowns: [
        { percentage: 5, milestone: 'Down Payment', date: 'On Booking' },
        { percentage: 5, milestone: 'Within 30 Days', date: 'After booking' },
        { percentage: 10, milestone: 'During Construction', date: 'Monthly installments' },
        { percentage: 30, milestone: 'On Completion', date: 'At handover' },
        { percentage: 50, milestone: 'Post Handover', date: '60 months' }
      ]
    }
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;
  const currentPlan = displayPlans[activePlan];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Payment Plans</h2>
          <p className="text-gray-500 text-sm">Flexible payment options available</p>
        </div>
      </div>

      {/* Plan Tabs */}
      {displayPlans.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {displayPlans.map((plan, idx) => (
            <button
              key={idx}
              onClick={() => setActivePlan(idx)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                activePlan === idx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>
      )}

      {/* Payment Timeline */}
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-8 left-0 right-0 h-2 bg-gray-100 rounded-full" />
        
        {/* Progress Segments */}
        <div className="absolute top-8 left-0 right-0 h-2 rounded-full overflow-hidden flex">
          {currentPlan?.breakdowns?.map((_, idx) => {
            const width = currentPlan.breakdowns[idx].percentage;
            return (
              <motion.div
                key={idx}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`h-full ${
                  idx === 0 ? 'bg-blue-600' :
                  idx === 1 ? 'bg-blue-500' :
                  idx === 2 ? 'bg-blue-400' :
                  idx === 3 ? 'bg-blue-300' :
                  'bg-blue-200'
                }`}
              />
            );
          })}
        </div>

        {/* Breakdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-16">
          {currentPlan?.breakdowns?.map((breakdown, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector Dot */}
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white ${
                idx === 0 ? 'bg-blue-600' :
                idx === 1 ? 'bg-blue-500' :
                idx === 2 ? 'bg-blue-400' :
                idx === 3 ? 'bg-blue-300' :
                'bg-blue-200'
              } shadow-sm`} />

              <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {breakdown.percentage}%
                </p>
                <p className="text-xs font-medium text-gray-700 mb-1">
                  {breakdown.milestone}
                </p>
                <p className="text-xs text-gray-500">
                  {breakdown.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Check className="w-4 h-4 text-blue-600" />
          <span>No hidden charges</span>
        </div>
        <div className="text-sm text-gray-500">
          Total: <span className="font-bold text-gray-900">100%</span>
        </div>
      </div>
    </motion.div>
  );
}