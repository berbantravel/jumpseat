'use client';

import { useState, Suspense, useEffect, ChangeEvent } from 'react';
import { useRouter } from "next/navigation";
import PaymentMethodSection from '@/components/PaymentMethodSection';
import { countries } from '@/constants/countries';

import {
  CheckoutProvider,
  useCheckoutContext,
} from '@/contexts/CheckoutContext';


type PaymentResponse = {
  success: boolean
  payload: {
    [key: string]: string
  }
}

type Package = {
  id: string;
  price: number;
  title: string;
  quantity?: number;
  image: string;
  sim_title: string;
  description: string;
  planId: string;
};

interface ApiResponse {
  order?: {
    data?: {
      sims?: { iccid?: string }[];
    };
  };
}
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  message?: string;
};



const CheckoutContent = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { formData, setFormData } = useCheckoutContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [checkoutConfirmed, setcheckoutConfirmed] = useState(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    const storedPackage = sessionStorage.getItem("selectedPackage");
    if (storedPackage) {
      setSelectedPackage(JSON.parse(storedPackage));
    } else {
      router.push("/");
    }
  }, [router]);

  const handlePaymentMethodSelect = (methodId: number) => {
    setSelectedPaymentMethod(methodId);
    
    // If BPI Installment direct integration is selected
    if (methodId === 107) {
        // The tenor selection will be handled on iPay88's page
        // No additional action needed here
    }
    
    // For specific tenor selections (Option 2)
    const bpiInstallmentIds = [80, 81, 82, 83]; // Add all BPI installment IDs
    if (bpiInstallmentIds.includes(methodId)) {
        // These already have specific tenors associated with their IDs
        // The PaymentId will be sent directly to iPay88
    }
};

  const generateRefNo = (): string => {
    const timestamp = Date.now();
    const fullName = `${formData.firstName || ""}${formData.lastName || ""}`.replace(/\s+/g, '').toUpperCase();
    const packageId = selectedPackage?.id || "Unknown";
    return `REF-${timestamp}-${packageId}`;
  };

  const isFormValid = () => {
    return (
      isValidEmail(formData.email) &&
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.country &&
      formData.postalCode &&
      formData.phone &&
      termsAccepted &&
      checkoutConfirmed &&
      selectedPaymentMethod !== null
    )
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.min(Math.max(value, 1), 50)); // Ensures value is within min/max range
  };

  const initiatePayment = async (productDetails: { name: string; description: string }) => {
    try {
      localStorage.setItem("USER_INFORMATION", JSON.stringify(formData));
      setIsProcessing(true);
  
      const subtotal = selectedPackage ? selectedPackage.price * quantity : 0;
      const processingFee = getProcessingFee(selectedPaymentMethod, subtotal);
      const total = subtotal + processingFee;
  
      const payload = {
        MerchantCode: "PH01663",
        PaymentId: selectedPaymentMethod,
        RefNo: generateRefNo(),
        Quantity: quantity,
        SubTotal: subtotal,
        Total: total,
        ProcessingFee: processingFee,
        Amount: total.toFixed(2),
        Currency: process.env.NEXT_PUBLIC_IPAY88_CURRENCY,
        ProdDesc: `${productDetails.name} - ${productDetails.description}`,
        UserName: `${formData.firstName} ${formData.lastName}`,
        UserEmail: formData.email,
        UserContact: formData.phone,
        Remark: formData.message || "",
        Lang: process.env.NEXT_PUBLIC_IPAY88_LANG,
        SignatureType: process.env.NEXT_PUBLIC_IPAY88_SIGNATURE_TYPE,
        ResponseURL: `${window.location.origin}/api/payment-response`,
        BackendURL: `${window.location.origin}/api/payment-backend`,
      };
  
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("IPAY88_PAYLOAD", JSON.stringify(data.payload));
        submitToIPay88(data.payload);
        return true; // Indicate success
      } else {
        console.error("Failed to initiate payment:", data);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error in initiatePayment:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBuyNow = async () => {
    if (!selectedPackage?.planId || !selectedPackage?.title || quantity <= 0) {
      alert("Invalid package selection. Please select a valid package.");
      return;
    }
  
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    try {
      setIsProcessing(true);
  
      const productDetails = {
        name: selectedPackage.title,
        description: `1 sim ${selectedPackage.title}`,
      };
  
      // Step 1: Initiate Payment
      const paymentSuccess = await initiatePayment(productDetails);
      if (!paymentSuccess) {
        alert("Payment failed or canceled.");
        return;
      }
  
      // Step 2: Proceed with Order after Successful Payment
      const response = await fetch("/api/packages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
          package_id: selectedPackage.planId,
          description: `1 sim ${selectedPackage.title}`,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to process the order");
      }
  
      const data: ApiResponse = await response.json();
      const iccid = data?.order?.data?.sims?.[0]?.iccid || "No ICCID available";
  
      localStorage.setItem("ICCID", iccid);

    } catch (err) {
      alert("Something went wrong! Please try again.");
      console.error("Error in handleBuyNow:", err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  

  const submitToIPay88 = (payload: PaymentResponse['payload']) => {
    const form = document.createElement('form');
    form.method = 'POST';
    // form.action = process.env.NEXT_PUBLIC_IPAY88_URL as string;
    form.action = 'https://sandbox.ipay88.com.ph/ePayment/entry.asp'

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const getProcessingFee = (paymentMethodId: number | null, subtotal: number): number => {
    if (paymentMethodId === null) return 0;

    const calculateWithVAT = (percentage: number) => {
      const fee = subtotal * (percentage / 100);
      return fee + (fee * 0.12);
    };

    switch (paymentMethodId) {
      case 1:
      case 7:
      case 37:
      case 94:
      case 72:
      case 104:
      case 97:
      case 134:
      case 139:
        return calculateWithVAT(0.50);
      case 3:
        return calculateWithVAT(2.10);
      case 6:
        return 5.00;
      case 38:
        return calculateWithVAT(2.30);
      case 57:
      case 103:
        return calculateWithVAT(2.00);
      case 129:
        return subtotal * 0.02;
      case 130:
        return subtotal * 0.025;
      case 58:
      case 69:
        return 25.00 + (25.00 * 0.12);
      case 18:
      case 19:
        return 25.00;
      case 20:
        return 20.00;
      default:
        return 0;
    }
  };

  const getProcessingFeeDescription = (paymentMethodId: number | null): string => {
    if (paymentMethodId === null) return '';

    switch (paymentMethodId) {
      case 1:
      case 7:
      case 37:
      case 94:
      case 72:
      case 104:
      case 97:
      case 134:
      case 139:
        return '0.50% + 12% VAT';
      case 3:
        return '2.10% + 12% VAT';
      case 6:
        return 'Php 5.00';
      case 38:
        return '2.30% + 12% VAT';
      case 57:
      case 103:
        return '2.00% + 12% VAT';
      case 129:
        return '2.00%';
      case 130:
        return '2.50%';
      case 58:
      case 69:
        return 'Php 25.00 + 12% VAT';
      case 18:
      case 19:
        return 'Php 25.00';
      case 20:
        return 'Php 20.00';
      default:
        return '';
    }
  };

  const subtotal = selectedPackage ? selectedPackage.price * quantity : 0;
  const processingFee = getProcessingFee(selectedPaymentMethod, subtotal);
  const total = subtotal + processingFee;

  return (

    <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <h1 className="font-bold text-center text-2xl mb-5">eSIM Checkout</h1>
      {selectedPackage ? (
        <div className="border rounded-lg p-5 shadow-md bg-white">
      
          
          <form className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
            <div>
            <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => setEmailTouched(true)}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm ${emailTouched && !isValidEmail(formData.email)
                          ? 'border-red-500'
                          : ''
                          }`}
                      />
                      {emailTouched && !isValidEmail(formData.email) && (
                        <p className="mt-2 text-sm text-red-600">
                          Please enter a valid email address.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              
              <div>
                <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
                >
                First name <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div>
                <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
                >
                Last name <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
                >
                Company
                </label>
                <div className="mt-1">
                <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
                >
                Address <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-700"
                >
                Apartment, suite, etc.
                </label>
                <div className="mt-1">
                <input
                    id="apartment"
                    name="apartment"
                    type="text"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div>
                <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
                >
                City <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div>
                <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
                >
                Country <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <select
                    required
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                >
                    <option value="">- Please select country -</option>
                    {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            <div>
                <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
                >
                State / Province <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div>
                <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
                >
                Postal code <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
            </div>
            <div className="sm:col-span-2">
                <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
                >
                Phone <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                <input
                    required
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                />
                </div>
                <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                    Additional Information
                </h2>
                <div className="mt-4">
                    <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Order Notes (optional)
                    </label>
                    <div className="mt-1">
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                    />
                    </div>
                </div>
                </div>
                
            </div>
            
              </div>
           <div>

           </div>
            
      
         
           <PaymentMethodSection onPaymentMethodSelect={handlePaymentMethodSelect} />

         
              <div className="mt-10 lg:mt-0 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium text-gray-900">
                          Order summary
                        </h2>
                        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                          <h3 className="sr-only">Items in your cart</h3>
                          <ul role="list" className="divide-y divide-gray-200">
                            <li
                             
                              className="flex px-4 py-6 sm:px-6"
                            >
                              <div className="flex-shrink-0">
                                <img alt="" src={selectedPackage.image} className="w-20 rounded-md" width={800} height={600}/>
                              </div>
                              <div className="ml-6 flex flex-1 flex-col">
                                <div className="flex">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm">
                                      <div className="font-bold text-gray-700 hover:text-gray-800">
                                        {selectedPackage.sim_title} ({selectedPackage.title})
                                      </div>
                                    </h4>
                                  </div>
                  
                                </div>
                                <div className="flex flex-1 items-start justify-between">
                                  <p className="mt-1 text-sm font-medium text-gray-900">
                                    Php {selectedPackage.price.toFixed(2)}
                                  </p>

                                  <div className="ml-4">
                                    <label htmlFor="quantity" className="sr-only">
                                      Quantity
                                    </label>
                                   
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39] sm:text-sm"
                                      />
                                  </div>

                        
                                </div>
                              </div>
                            </li>
                          </ul>
                          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                              <dt className="text-sm">Subtotal</dt>
                              <dd className="text-sm font-medium text-gray-900">
                                Php {subtotal.toFixed(2)}
                              </dd>
                            </div>
                            {processingFee > 0 && (
                              <div className="flex items-center justify-between">
                                <dt className="text-sm">
                                  Processing Fee ({getProcessingFeeDescription(selectedPaymentMethod)})
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                  Php {processingFee.toFixed(2)}
                                </dd>
                              </div>
                            )}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                              <dt className="text-base font-medium">Total</dt>
                              <dd className="text-base font-medium text-gray-900">
                                Php {total.toFixed(2)}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

          <div className="relative mt-10 flex items-start">
            <div className="flex h-6 items-center">
                <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                />

            </div>
            <div className="ml-3 text-sm leading-6">
                <label
                htmlFor="offers"
                className="font-medium text-gray-900"
                >
                Terms and Conditions{' '}
                <span className="text-red-600">*</span>
                </label>
                <p id="offers-description" className="text-gray-500">
                I certify that I have read and accept the
                <a
                    href="/Payment Terms and Conditions_BerBan Travel Corporation 2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer font-medium text-[#ff9e39] hover:underline"
                >
                    {' '}
                    Terms of Use and Privacy Statement{' '}
                </a>
                and I have read and understand the Rate Description and
                Rate Rules for my reservation. I am at least 18 years of
                age and at least one guest in my party will meet the
                minimum check-in age requirement for the hotel upon
                arrival. Minimum Check-ln Age: 18
                </p>
            </div>
            </div>
            <div className="relative mt-10 flex items-start">
            <div className="flex h-6 items-center">
                <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={checkoutConfirmed}
                onChange={(e) => setcheckoutConfirmed(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                />
            </div>
            <div className="ml-3 text-sm leading-6">
                <label
                htmlFor="offers"
                className="font-medium text-gray-900"
                >
                Confirmation <span className="text-red-600">*</span>
                </label>
                <p className="mb-4 text-sm text-gray-600">
                Please carefully review all the information you&apos;ve
                provided above to ensure its accuracy. By proceeding,
                you confirm that all details, including your personal
                information, shipping address, and order details, are
                correct. Any errors in this information may result in
                delays or issues with your order. If you need to make
                any changes, please do so before confirming your order.
                </p>
            </div>
            </div>              
              <div className="mt-10 border-t border-gray-200 py-6">
              <button
                  type="button"
                  onClick={handleBuyNow}
                  
                  className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50`}
                >
                  {isProcessing ? "Processing..." : "Confirm order"}
                </button>

              </div>
            </div>
          
         </form>
         
        </div>
      ) : (
        <p>Loading checkout details...</p>
      )}
    </div>
    
    );
};

export default function Checkout() {
  return (
    <CheckoutProvider>
      <Suspense>
        <CheckoutContent />
      </Suspense>
    </CheckoutProvider>
  );
};