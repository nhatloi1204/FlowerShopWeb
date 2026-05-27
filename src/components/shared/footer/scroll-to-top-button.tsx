'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 md:right-10 md:bottom-10 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center hover:bg-neutral-800 shadow-md cursor-pointer group border-none z-50 transition-all duration-500 ease-in-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-75'
      }`}
      title='Scroll to top'
    >
      <ArrowUp className='w-4 h-4 transition-transform group-hover:-translate-y-0.5' />
    </button>
  )
}
