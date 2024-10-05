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
      <div className="relative flex w-full flex-col">
        {shouldShowHeaderFooter && <Header />}
        <main className={`flex-auto ${shouldShowHeaderFooter ? 'pt-16' : ''}`}>{children}</main>
        {shouldShowHeaderFooter && <Footer />}
      </div>
    </>
  )
}
