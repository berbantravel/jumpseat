import React, { useState, useCallback } from 'react';
import { paymentGroups } from '@/constants/paymentGroups'

interface PaymentMethodSectionProps {
  onPaymentMethodSelect: (methodId: number) => void;
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({ onPaymentMethodSelect }) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);

  const handleMethodSelect = useCallback((methodId: number) => {
    setSelectedMethod(methodId);
    onPaymentMethodSelect(methodId);
  }, [onPaymentMethodSelect]);

  return (
    <div className="my-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method <span className="text-red-600">*</span></h2>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {paymentGroups.map((group, index) => (
            <button
              key={group.name}
              type="button" // Add this line
              onClick={() => setSelectedGroup(index)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${selectedGroup === index
                  ? 'border-[#ff9e39] text-[#ff9e39]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {group.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {paymentGroups[selectedGroup].methods.map((method) => (
          <div key={method.id} className="flex items-center mt-2">
            <input
              id={`method-${method.id}`}
              name="payment-method"
              type="radio"
              checked={selectedMethod === method.id}
              onChange={() => handleMethodSelect(method.id)}
              className="h-4 w-4 border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
            />
            <label htmlFor={`method-${method.id}`} className="ml-3 block text-sm font-medium text-gray-700">
              {method.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSection;