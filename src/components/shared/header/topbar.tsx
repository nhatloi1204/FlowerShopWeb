import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Topbar() {
  return (
    <div className='w-full text-xs text-neutral-300 py-2.5 flex justify-between items-center'>
      <div>
        <span className='tracking-wide font-medium'>
          FREE DELIVERY ON ALL ORDERS OVER $100
        </span>
      </div>

      <div className='flex items-center gap-6'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-1 cursor-pointer hover:text-white transition-colors outline-none font-medium'>
            USD <ChevronDown className='w-3 h-3 text-neutral-500' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='rounded-lg'>
            <DropdownMenuItem className='cursor-pointer'>
              USD ($)
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              VND (đ)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-1 cursor-pointer hover:text-white transition-colors outline-none font-medium'>
            ENGLISH <ChevronDown className='w-3 h-3 text-neutral-500' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='rounded-lg'>
            <DropdownMenuItem className='cursor-pointer'>
              ENGLISH
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              VIETNAMESE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
