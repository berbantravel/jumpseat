import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col w-full h-full max-h-screen items-center justify-center my-10">
      <div className="w-full sm:max-w-lg max-w-sm bg-white p-6 rounded-lg flex-col flex gap-4 shadow-xl">
        <h2 className="w-full font-poppinsSemiBold sm:text-4xl  text-2xl font-semibold text-center text-gray-800">Join Our B2B Network</h2>
        <SignUpForm />
        <div className="text-center text-sm text-gray-600">
          Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign in</a>
        </div>
      </div>
    </div>  
  );
}
