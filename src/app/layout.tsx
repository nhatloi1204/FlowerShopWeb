import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = Inter({
  variable: '--font-inter',
  subsets: ['vietnamese'],
})

export const metadata: Metadata = {
  title: 'Shop Flower Web',
  description:
    'Shop Flower Web is a flower shop website built with Next.js and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={cn(inter.variable, 'font-sans', geist.variable)}>
      <body className='min-h-full flex flex-col'>
        <Toaster richColors closeButton position='bottom-right' />
        <main>{children}</main>
      </body>
    </html>
  )
}
