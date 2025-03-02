// import { useState, FormEvent } from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'

// interface SignupData {
//   name: string
//   email: string
//   password: string
// }

// export default function SignUp() {
//   const [name, setName] = useState<string>('')
//   const [email, setEmail] = useState<string>('')
//   const [password, setPassword] = useState<string>('')
//   const [error, setError] = useState<string>('')
//   const router = useRouter()

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     try {
//       const signupData: SignupData = { name, email, password }

//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(signupData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong')
//       }

//       // Redirect to login page after successful signup
//       router.push('/login')
//     } catch (error) {
//       setError(
//         error instanceof Error ? error.message : 'An unknown error occurred',
//       )
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//         </div>

//         {error && (
//           <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
//             {error}
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="-space-y-px rounded-md shadow-sm">
//             <div>
//               <label htmlFor="name" className="sr-only">
//                 Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link
//               href="/login"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
