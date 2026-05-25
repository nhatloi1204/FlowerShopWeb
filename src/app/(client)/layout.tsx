import Header from '@/components/shared/header'
import Container from '@/components/container'
// import Footer from '@/components/shared/footer'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='theme-client min-h-screen bg-white flex flex-col antialiased'>
      <Header />

      <main className='flex-1 bg-white'>
        <Container className='py-8'>{children}</Container>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
