import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
  const googleClientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!

  return (
    <html lang='en' className={cn(inter.variable, 'font-sans', geist.variable)}>
      <body>
        <div className='min-h-full bg-background antialiased flex flex-col'>
          <GoogleOAuthProvider clientId={googleClientId}>
            <Toaster richColors closeButton position='bottom-right' />
            {children}
          </GoogleOAuthProvider>
        </div>
      </body>
    </html>
  )
}
