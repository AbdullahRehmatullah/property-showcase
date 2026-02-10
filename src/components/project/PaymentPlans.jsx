import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Check } from 'lucide-react';

export default function PaymentPlans({ plans = [] }) {
  const [activePlan, setActivePlan] = useState(0);

  // Parse if plans is a JSON string
  let parsedPlans = plans;
  if (typeof plans === 'string') {
    try {
      parsedPlans = JSON.parse(plans);
    } catch (e) {
      parsedPlans = [];
    }
  }

  const defaultPlans = [
    {
      name: 'Standard Plan',
      items: [
        { name: '10%', description: 'Down Payment' },
        { name: '0.5% monthly', description: 'During Construction' },
        { name: 'Remaining', description: 'On Handover' }
      ]
    }
  ];

  const displayPlans = parsedPlans?.length > 0 ? parsedPlans : defaultPlans;
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

      {/* Payment Items */}
      <div className="space-y-3">
        {currentPlan?.items?.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <Check className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Description */}
      {currentPlan?.description && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-600" />
            {currentPlan.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}