"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-10 md:mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-2xl font-bold text-[#ff9e39] mb-4">Privacy Policy</h1>
      <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
      <p>Welcome to <strong>Jumpseat Tours</strong> your privacy is important to us.</p>

      <h2 className="text-xl font-semibold text-[#ff9e39] mt-6">1. Information We Collect</h2>
      <ul className="list-disc pl-6">
        <li>Personal details like name, email, and phone number.</li>
        <li>Travel preferences and booking details.</li>
        <li>Website usage data through cookies.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#ff9e39] mt-6">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6">
        <li>To process bookings and provide services.</li>
        <li>To communicate and personalize your experience.</li>
        <li>To improve our services and comply with legal obligations.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#ff9e39] mt-6">3. Data Protection</h2>
      <p>We take security measures to protect your personal data but cannot guarantee absolute security.</p>

      <h2 className="text-xl font-semibold text-[#ff9e39] mt-6">4. Your Rights</h2>
      <p>You have the right to access, update, or delete your data. Contact us at <a href="mailto:mabuhay@jumpseat.com" className="text-[#ff9e39] underline">mabuhay@jumpseat.com</a> for any requests.</p>

      <h2 className="text-xl font-semibold text-[#ff9e39] mt-6">5. Contact Information</h2>
      <p><strong>Address:</strong> Don Sergio, Barangay San Juan, San Carlos City, Pangasinan 2420</p>
      <p><strong>Phone:</strong> +63-995-015-8869, +63-918-746-6894, +63-912-746-6894</p>
      <p><strong>Email:</strong> <a href="mailto:mabuhay@jumpseat.com" className="text-[#ff9e39] underline">mabuhay@jumpseat.com</a></p>

      <p className="mt-6">For more details, please refer to our full Privacy Policy.</p>
    </div>
  );
};

export default PrivacyPolicy;
