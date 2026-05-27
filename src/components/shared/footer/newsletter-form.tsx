'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed email:', email)
    setEmail('')
  }

  return (
    <form
      onSubmit={handleSubscribe}
      className='w-full max-w-xl flex items-center border-b border-neutral-300 py-2 group focus-within:border-neutral-800 transition-colors'
    >
      <Mail className='w-5 h-5 text-neutral-400 mr-3 shrink-0' />
      <input
        type='email'
        placeholder='Enter you email'
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='w-full bg-transparent text-sm text-neutral-800 focus:outline-hidden placeholder:text-neutral-400 font-medium'
      />
      <button
        type='submit'
        className='text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors pl-4 cursor-pointer bg-transparent border-none shrink-0'
      >
        Subscribe
      </button>
    </form>
  )
}
