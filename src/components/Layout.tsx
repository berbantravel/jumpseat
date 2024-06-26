'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noHeaderFooterPaths = ['/login', '/sign-up', '/set-password']

  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(pathname)

  return (
    <>
      {/* <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          
        </div>
      </div> */}
      <div className="relative flex w-full flex-col">
        {shouldShowHeaderFooter && <Header />}
        <main className={`flex-auto ${shouldShowHeaderFooter ? 'pt-16' : ''}`}>{children}</main>
        {shouldShowHeaderFooter && <Footer />}
      </div>
    </>
  )
}
