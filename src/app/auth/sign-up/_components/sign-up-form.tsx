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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg max-h-screen">
      <input 
        name="firstName" 
        placeholder="First Name" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
      />
      <input 
        name="lastName" 
        placeholder="Last Name" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
      />
      <input 
        name="companyName" 
        placeholder="Company Name" 
        onChange={handleChange} 
        className="border p-2 rounded"
        disabled={isSubmitting}
      />
      <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        onChange={handleChange} 
        required 
        className="border p-2 rounded"
        disabled={isSubmitting}
      />
      <input 
        name="phoneNumber" 
        placeholder="Phone Number" 
        onChange={handleChange} 
        className="border p-2 rounded"
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`mt-6 w-full text-white rounded-md px-6 py-3 text-base font-semibold 
          ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff9e39] hover:bg-[#ff9e39]/90'}
          focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2`}
      >
        {isSubmitting ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
}