import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: number
  name: string
  slug: string
  price: number
  imageUrl: string
}

interface WishlistState {
  wishlistItems: WishlistItem[]
  toggleWishlist: (product: WishlistItem) => void
  isInWishlist: (id: number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: product => {
        set(state => {
          const isExisted = state.wishlistItems.some(
            item => item.id === product.id,
          )
          if (isExisted) {
            return {
              wishlistItems: state.wishlistItems.filter(
                item => item.id !== product.id,
              ),
            }
          }
          return { wishlistItems: [...state.wishlistItems, product] }
        })
      },

      isInWishlist: id => {
        return get().wishlistItems.some(item => item.id === id)
      },
    }),
    {
      name: 'flower-shop-wishlist',
    },
  ),
)
