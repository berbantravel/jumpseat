import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col w-full h-full max-h-screen items-center justify-center my-32">
      <div className="w-full sm:max-w-lg max-w-sm bg-white p-6 rounded-lg flex-col flex gap-4 shadow-xl">
        <SignUpForm />
        
      </div>
    </div>  
  );
}
