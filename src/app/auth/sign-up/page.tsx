import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col w-full h-full max-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg flex-col flex gap-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
        <SignUpForm />
        <div className="text-center text-sm text-gray-600">
          Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign in</a>
        </div>
      </div>
    </div>  
  );
}
