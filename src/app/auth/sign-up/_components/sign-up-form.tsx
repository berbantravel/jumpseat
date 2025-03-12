"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    phoneNumber: "",
    email: "",
    website: "",
    
    primaryContactTitle: "",
    primaryContactOther: "",
    primaryFirstName: "",
    primaryLastName: "",
    primaryPosition: "",
    primaryEmail: "",
    primaryMobile: "",
    secondaryFirstName: "",
    secondaryLastName: "",
    secondaryPosition: "",
    secondaryEmail: "",
    secondaryMobile: "",
    typeOfOperation: "",
    existingMarkets: [] as string[],
    productsServices: [] as Array<{ type: string; name: string; description: string }>,
    newProductServiceType: "product",
    newProductServiceName: "",
    newProductServiceDescription: "",
    existingMarketsOther: "",
    companyType: "",
    companyTypeOther: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setForm(prev => {
      const updatedValues = checked
        ? [...prev.existingMarkets, value]
        : prev.existingMarkets.filter(item => item !== value);
      return { ...prev, [name]: updatedValues };
    });
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        if (!form.companyName || !form.email || !form.phoneNumber) {
          toast.error("Please fill in all required company information");
          return false;
        }
        break;
  
      case 2:
        if (!form.primaryContactTitle || !form.primaryFirstName || 
            !form.primaryLastName || !form.primaryEmail || !form.primaryMobile) {
          toast.error("Please fill in all required primary contact fields");
          return false;
        }
        if (form.primaryContactTitle === "Other" && !form.primaryContactOther) {
          toast.error("Please specify your title");
          return false;
        }
        break;
  
      case 3:
        // Secondary contact is optional, no validation needed
        break;
  
      case 4:
        if (!form.typeOfOperation) {
          toast.error("Please select a type of operation");
          return false;
        }
        break;
  
      case 5:
        if (form.existingMarkets.length === 0) {
          toast.error("Please select at least one existing market");
          return false;
        }
        if (form.existingMarkets.includes("Others") && !form.existingMarketsOther) {
          toast.error("Please specify 'Other' markets");
          return false;
        }
        break;
  
      case 6:
        if (form.productsServices.length === 0) {
          toast.error("Please add at least one product or service");
          return false;
        }
        break;
  
      case 7:
        if (!form.companyType) {
          toast.error("Please select a company type");
          return false;
        }
        if (form.companyType === "Other" && !form.companyTypeOther) {
          toast.error("Please specify your company type");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
  
    setIsSubmitting(true);
    try {
      // Clean payload with proper null handling
      const payload = {
        ...form,
        productsServices: form.productsServices.map(item => ({
          type: item.type,
          name: item.name,
          description: item.description
        })),
        existingMarkets: form.existingMarkets.includes("Others")
          ? [...form.existingMarkets.filter(m => m !== "Others"), form.existingMarketsOther]
          : form.existingMarkets,
        companyTypeOther: form.companyType === "Other" ? form.companyTypeOther : null
      };
  
      // Remove temporary fields
      const { 
        newProductServiceType,
        newProductServiceName,
        newProductServiceDescription,
        existingMarketsOther,
        ...cleanPayload
      } = payload;
  
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanPayload),
      });
  
      if (!res.ok) throw await res.json();
      
      toast.success("Data saved successfully!");
      router.push("/thank-you");
    } catch (error: any) {
      toast.error(error.message || "Submission failed");
      console.error("Submission error details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-8 text-center gap-4">
        <div className="flex flex-col">
        <h1 className="w-full font-poppinsSemiBold sm:text-4xl text-2xl font-semibold text-center text-gray-800 ">
          Join Our Travel Network
        </h1>
       
        </div>
        <div className="flex justify-center gap-2 ">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full ${s <= step ? "bg-[#ff9e39]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Company Information */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Company Name *</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Company Address *</label>
              <input
                name="companyAddress"
                value={form.companyAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Telephone Number *</label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email Address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Website</label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#ff9e39] w-full text-white px-6 py-2 rounded hover:bg-[#ea9030] disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
            {/* Step 2: Primary Contact */}
            {step === 2 && (
  <div>
    <h2 className="text-xl font-semibold mb-6">Primary Contact Person</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">Title *</label>
        <div className="flex flex-wrap gap-4">
          {["Mr", "Ms", "Mrs", "Rather not say", "Other"].map((title) => (
            <label key={title} className="flex items-center gap-2">
              <input
                type="radio"
                name="primaryContactTitle" // Changed from primaryTitle
                value={title}
                checked={form.primaryContactTitle === title}
                onChange={handleChange}
                required
              />
              {title}
            </label>
          ))}
        </div>
              {form.primaryContactTitle === "Other" && ( // Changed from primaryContactOther
          <input
            name="primaryContactOther" // Changed from primaryOtherTitle
            placeholder="Specify Title"
            value={form.primaryContactOther}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded"
            required
          />
        )}
      </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name *</label>
                <input
                  name="primaryFirstName"
                  value={form.primaryFirstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Last Name *</label>
                <input
                  name="primaryLastName"
                  value={form.primaryLastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Position</label>
              <input
                name="primaryPosition"
                value={form.primaryPosition}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Email Address *</label>
                <input
                  name="primaryEmail"
                  type="email"
                  value={form.primaryEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mobile Number *</label>
                <input
                  name="primaryMobile"
                  value={form.primaryMobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] w-full"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Secondary Contact */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Secondary Contact Person</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  name="secondaryFirstName"
                  value={form.secondaryFirstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  name="secondaryLastName"
                  value={form.secondaryLastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Position</label>
              <input
                name="secondaryPosition"
                value={form.secondaryPosition}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Email Address</label>
                <input
                  name="secondaryEmail"
                  type="email"
                  value={form.secondaryEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mobile Number</label>
                <input
                  name="secondaryMobile"
                  value={form.secondaryMobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] w-full"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Type of Operation */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Type of Operation</h2>
          <div className="space-y-3">
            {["Inbound", "Outbound", "Online Travel Agency"].map((operation) => (
              <label key={operation} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="typeOfOperation"
                  value={operation}
                  checked={form.typeOfOperation === operation}
                  onChange={handleChange}
                  className="w-5 h-5"
                  required
                />
                <span className="text-gray-700">{operation}</span>
              </label>
            ))}
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] w-full"
            >
              Next
            </button>
          </div>
        </div>
      )}
            {/* Step 5: Existing Markets */}
            {step === 5 && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Existing Market/s</h2>
          <div className="grid grid-cols-2 gap-4">
            {["Local Tourists", "Students", "MICE", "Expats", "Business Travelers", "International Tourists", "Others"].map((market) => (
              <label key={market} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="existingMarkets"
                  value={market}
                  checked={form.existingMarkets.includes(market)}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">{market}</span>
              </label>
            ))}
          </div>
          {form.existingMarkets.includes("Others") && (
            <div className="mt-4">
              <input
                name="existingMarketsOther"
                placeholder="Please specify other markets"
                value={form.existingMarketsOther}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] w-full"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Products & Services */}
      {step === 6 && (
  <div>
    <h2 className="text-xl font-semibold ">Name of Product or Services</h2>
    <div className="space-y-4">
      {form.productsServices.map((item, index) => (
        <div key={index} className="border p-4 rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block px-2 py-1 text-sm bg-[#ff9e39] text-white rounded">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
              <h3 className="mt-2 font-medium text-gray-800">{item.name}</h3>
            </div>
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  productsServices: prev.productsServices.filter((_, i) => i !== index),
                }))
              }
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <div className="border-t pt-4 mt-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Type*</label>
            <select
              value={form.newProductServiceType}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  newProductServiceType: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Name* </label>
            <input
              value={form.newProductServiceName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  newProductServiceName: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. Travel Insurance, Hotel Booking, Car Rental, Flight Ticket"
            />
          </div>

          

          <button
            type="button"
            onClick={() => {
              if (form.newProductServiceName && form.newProductServiceDescription) {
                setForm((prev) => ({
                  ...prev,
                  productsServices: [
                    ...prev.productsServices,
                    {
                      type: prev.newProductServiceType,
                      name: prev.newProductServiceName,
                      description: prev.newProductServiceDescription,
                    },
                  ],
                  newProductServiceType: "product",
                  newProductServiceName: "",
                  newProductServiceDescription: "",
                }));
              }
            }}
            className="bg-[#ff9e39] text-white px-4 py-2 rounded hover:bg-[#ea9030]"
          >
            Add {form.newProductServiceType.charAt(0).toUpperCase() + form.newProductServiceType.slice(1)}
          </button>
        </div>
      </div>
    </div>

    <div className="mt-8 flex justify-between gap-4">
      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
      >
        Back
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] w-full"
      >
        Next
      </button>
    </div>
  </div>
)}

      {/* Step 7: Company Type */}
{step === 7 && (
  <div>
    <h2 className="text-xl font-semibold mb-6">Company Type</h2>
    <div className="space-y-3">
      {[
        "Philippine-based Travel Agency",
        "Philippine-based Tour Operator",
        "Foreign-based Travel Agency",
        "Local Tourist Office/Organization",
        "Foreign NTO/Organization",
        "Theme Park/Entertainment",
        "Cruise Liner / Shipping",
        "Airline",
        "Hotel",
        "Resort",
        "Insurance",
        "Other"
      ].map((type) => (
        <label key={type} className="flex items-center gap-3">
          <input
            type="radio"
            name="companyType"
            value={type}
            checked={form.companyType === type}
            onChange={handleChange}
            className="text-[#ff9e39] w-4 h-4"
            required
          />
          <span className="text-gray-700">{type}</span>
        </label>
      ))}
    </div>

    {/* Other Company Type Input */}
    {form.companyType === "Other" && (
      <div className="mt-4">
        <input
          name="companyTypeOther"
          placeholder="Please specify company type"
          value={form.companyTypeOther}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
    )}

    {/* Data Privacy Clause */}
<div className="mt-6 flex items-start gap-3">
  <input
    type="checkbox"
    id="agreePrivacy"
    className="w-5 h-5"
    required
  />
  <label htmlFor="agreePrivacy" className="text-gray-700 text-sm">
    I confirm that I have read and agree to the{" "}
    <a href="/privacy-policy" target="_blank" className="text-[#ff9e39] hover:underline">
      Data Privacy Policy
    </a>
  </label>
</div>


    {/* Submit and Back Buttons */}
<div className="mt-8 flex justify-between gap-4">
  <button
    type="button"
    onClick={prevStep}
    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 w-full"
  >
    Back
  </button>
  <button
    type="submit"
    className="bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] w-full disabled:bg-gray-400"
    disabled={isSubmitting} 
  >
    {isSubmitting ? "Submitting..." : "Submit"}
  </button>
</div>
</div>
)}
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/auth/sign-in")}
          className="text-[#ff9e39] hover:underline"
        >
          Sign in
        </button>
      </div>
    </form> 
  );
}