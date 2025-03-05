import React from "react";
import { useRouter } from "next/router";
import Image from 'next/image';


const plans = [
  { data: "1 GB", duration: "7 Days", price: "$4.50" },
  { data: "3 GB", duration: "30 Days", price: "$11.00" },
  { data: "5 GB", duration: "30 Days", price: "$16.00" },
];

const PricingModal = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-4">United States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="bg-blue-900 text-white p-4 rounded-lg">
              <div className="flex justify-center mb-2">
                <Image src="/usa-flag.png" alt="US Flag" className="w-10 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-center">{plan.data} - {plan.duration}</h3>
              <p className="text-center mt-2">Coverage: United States</p>
              <p className="text-center">Data: {plan.data}</p>
              <p className="text-center">Time: {plan.duration}</p>
              <p className="text-center font-bold mt-2">Price: {plan.price}</p>
              <button 
                onClick={() => router.push("/e-sim")}
                className="mt-4 w-full bg-white text-blue-900 font-bold py-2 rounded-lg">
                BUY NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;