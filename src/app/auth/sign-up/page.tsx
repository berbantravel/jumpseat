import SignUpForm from './_components/sign-up-form'

export default function SignUpPage() {
  return (
    <div className="my-32 flex h-full max-h-screen w-full flex-col items-center justify-center xl:my-0">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-xl sm:max-w-lg">
        <SignUpForm />
      </div>
    </div>
  )
}
