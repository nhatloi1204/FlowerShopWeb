import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer/footer'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='theme-client min-h-screen bg-white flex flex-col antialiased'>
      <Header />

      <main className='flex-1 bg-white'>{children}</main>

      <Footer />
    </div>
  )
}
