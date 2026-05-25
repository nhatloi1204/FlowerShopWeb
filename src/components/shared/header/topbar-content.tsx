import { ChevronDown } from 'lucide-react'

export default function TopbarContent() {
  return (
    <div className='w-full flex flex-col md:flex-row justify-between items-center gap-3 text-neutral-600 md:text-neutral-300 text-xs font-medium leading-relaxed md:py-2.5'>
      <p>Free Delivery: Take advantage of our time to save event</p>

      <div className='flex items-center gap-6 font-bold text-neutral-800 md:text-white'>
        <span className='flex items-center gap-1 cursor-pointer hover:text-primary transition-colors'>
          USD <ChevronDown className='w-3 h-3 text-neutral-400' />
        </span>
        <span className='flex items-center gap-1 cursor-pointer hover:text-primary transition-colors'>
          ENGLISH <ChevronDown className='w-3 h-3 text-neutral-400' />
        </span>
      </div>
    </div>
  )
}
