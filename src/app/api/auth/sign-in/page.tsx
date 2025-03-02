// import { useState, FormEvent } from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'

// interface User {
//   id: number
//   email: string
//   name: string | null
//   createdAt: string
//   updatedAt: string
// }

// interface LoginResponse {
//   message: string
//   user: User
// }

// export default function SignIn() {
//   const [email, setEmail] = useState<string>('')
//   const [password, setPassword] = useState<string>('')
//   const [error, setError] = useState<string>('')
//   const router = useRouter()

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong')
//       }

//       const loginData = data as LoginResponse

//       // Store user info or token in localStorage or cookies
//       localStorage.setItem('user', JSON.stringify(loginData.user))

//       // Redirect to dashboard or home page
//       router.push('/dashboard')
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
//             Sign in to your account
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
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
//                 autoComplete="current-password"
//                 required
//                 className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//               />
//               <label
//                 htmlFor="remember-me"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a
//                 href="#"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link
//               href="/auth/sign-up"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
