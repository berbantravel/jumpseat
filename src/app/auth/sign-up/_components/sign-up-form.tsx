"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  // Handle form changes and trim whitespace
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });
  };

  // Basic frontend validation
  const validateForm = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("All required fields must be filled.");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success("Registration successful! Check your email for confirmation.");
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      toast.error("Error submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
      
      <label className="text-sm font-medium">First Name</label>
      <input 
        name="firstName" 
        placeholder="First Name" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
        autoComplete="given-name"
      />

      <label className="text-sm font-medium">Last Name</label>
      <input 
        name="lastName" 
        placeholder="Last Name" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
        autoComplete="family-name"
      />

      <label className="text-sm font-medium">Company Name (Optional)</label>
      <input 
        name="companyName" 
        placeholder="Company Name" 
        onChange={handleChange} 
        className="border p-2 rounded"
        disabled={isSubmitting}
        autoComplete="organization"
      />

      <label className="text-sm font-medium">Email</label>
      <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
        autoComplete="email"
      />

      <label className="text-sm font-medium">Password</label>
      <input 
        name="password" 
        type="password" 
        placeholder="Password (min. 6 characters)" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
        autoComplete="new-password"
      />

      <label className="text-sm font-medium">Phone Number (Optional)</label>
      <input 
        name="phoneNumber" 
        placeholder="Phone Number" 
        onChange={handleChange} 
        className="border p-2 rounded"
        disabled={isSubmitting}
        autoComplete="tel"
      />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`mt-6 w-full text-white rounded-md px-6 py-3 text-base font-semibold 
          ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff9e39] hover:bg-[#ff9e39]/90'}
          focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            Creating Account...
          </span>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
}
