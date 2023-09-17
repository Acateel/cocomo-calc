import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'COCOMO calculator',
  description: 'Laboratory work #1 for software economic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          font.className,
          'h-screen w-full flex items-center justify-center bg-slate-300/50'
        )}
      >
        {children}
      </body>
    </html>
  )
}
