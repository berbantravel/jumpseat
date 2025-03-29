import SignUpForm from './_components/sign-up-form'

export default function SignUpPage() {
  return (
    <div className="my-10 py-10 sm:py-12 lg:py-20 flex h-full max-h-screen lg:max-h-full w-full flex-col items-center justify-center xl:my-0">
       
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-xl sm:max-w-lg">
        <SignUpForm />
      </div>
    </div>
  )
}
