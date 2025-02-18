'use client';

import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/navigation";

export default function Experiences() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [installationInstructions, setInstallationInstructions] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/packages");
        const data = await response.json();

        console.log("🟢 Frontend: Retrieved Packages:", data);

        if (response.ok) {
          setPackages(data.data || []);
        } else {
          setError(data.error || "Failed to retrieve packages");
        }
      } catch (err) {
        console.error("🔴 Frontend Fetch Error:", err);
        setError(err.message);
      }
    };

    fetchPackages();
  }, []);

  // Handle Order Purchase & Fetch Installation Instructions
  const handleBuyNow = async (planId, title, operator,data, day,price, packageDetails) => {
    try {
      console.log(`🔵 Storing selected package in session for checkout...`);
  
      // Store in session (localStorage or sessionStorage)
      sessionStorage.setItem("selectedPackage", JSON.stringify({
        planId,
        title,
        operator,
        data,
        day,
        price,
        packageDetails,
        quantity: 1, // Default to 1, can be updated at checkout
        image: packageDetails.image.url, // Default to 1, can be updated at checkout
        sim_title: packageDetails.title,
      }));
  
      // Navigate to checkout page
      router.push("/checkout_2");
    } catch (err) {
      console.error("🔴 Error storing package in session:", err);
      alert("Something went wrong! Please try again.");
    }
  };

  
  return (
    <div className='container mx-auto max-w-screen-xl p-5'>
      <h1 className='font-bold text-center text-2xl mb-5'>Available eSIM Packages</h1>
      {error ? (
        <p className="text-red-500 text-center mt-3">Error: {error}</p>
      ) : packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {packages.map((pkg) => (
            <div 
              key={pkg.slug} 
              onClick={() => {
                setSelectedPackage(pkg); 
                setSelectedOperator(pkg.operators); 
              }}  
              className="border cursor-pointer rounded-lg shadow-md bg-white p-5"
            >
              <div className='flex items-center gap-2'>
                <div>
                  <img src={pkg.image.url} className='h-auto w-10' alt={pkg.title} />
                </div>
                <div>
                  <h2 className="font-semibold text-xs">{pkg.title}</h2>
                  <p className="text-xs text-gray-500">{pkg.country_code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-3">Loading</p>
      )}

      {/* Modal */}
      <Dialog 
        open={!!selectedOperator} 
        onClose={() => {
          setSelectedPackage(null);
          setSelectedOperator(null);
          setInstallationInstructions(null);
        }} 
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        {/* Overlay Background */}
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => {
          setSelectedPackage(null);
          setSelectedOperator(null);
          setInstallationInstructions(null);
        }}></div>

        {/* Dialog Content */}
        <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl w-full mx-4">
          {/* Close Button */}
          <button 
            onClick={() => {
              setSelectedPackage(null);
              setSelectedOperator(null);
              setInstallationInstructions(null);
            }} 
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Scrollable Content Wrapper */}
          <div className="max-h-[80vh] overflow-auto p-2">
            {/* Package Title */}
            {selectedPackage && (
              <div className="flex flex-col items-center border-b pb-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-center">{selectedPackage.title}</h2>
              </div>
            )}

            {/* Operator Packages */}
            {selectedOperator?.map((operator) => (
              <div key={operator.id} className="p-3 rounded-md mb-3">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {operator.packages.map((plan) => (
                    <div 
                      key={plan.id} 
                      className="p-4 border rounded-md shadow-sm space-y-4 text-white"
                      style={{ backgroundImage: `linear-gradient(to right, ${operator.gradient_start}, ${operator.gradient_end})` }}
                    >
                      <div className='flex items-center justify-between'> 
                        <p className='font-semibold'>{plan.title}</p>
                        <img src={selectedPackage.image.url} className='h-auto w-16 sm:w-20' alt={operator.title} />
                      </div>

                      <div className='space-y-2'>
                      <div className='flex justify-between'>
                          <p className="font-semibold">Coverage</p>
                          <p>{selectedPackage.title}</p>
                        </div>
                        <hr className='border border-white' />
                        
                        <div className='flex justify-between'>
                          <p className="font-semibold">Data</p>
                          <p>{plan.data}</p>
                        </div>
                        <hr className='border border-white' />
                        
                        <div className='flex justify-between'>
                          <p className='font-semibold'>Time</p>
                          <p>{plan.day}</p>
                        </div>
                        <hr className='border border-white' />
                        
                        <div className='flex justify-between'>
                          <p className='font-semibold'>Price</p>
                          <p>${plan.price.toFixed(2)}</p>
                        </div>

                        <div>
                          <button 
                            onClick={() => handleBuyNow(plan.id, plan.title,operator, plan.data,   plan.day, plan.price , selectedPackage)}
                            className='py-2 w-full border border-white hover:bg-white hover:text-black'
                          >
                            BUY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
