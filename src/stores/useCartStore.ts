import { create } from 'zustand'
import { persist } from 'zustand/middleware' // 🎯 Import middleware này

export interface CartItem {
  id: number
  name: string
  slug: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
  getCartCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: product => {
        set(state => {
          const existingItem = state.cartItems.find(
            item => item.id === product.id,
          )
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          }
        })
      },

      removeFromCart: id => {
        set(state => ({
          cartItems: state.cartItems.filter(item => item.id !== id),
        }))
      },

      increaseQuantity: id => {
        set(state => ({
          cartItems: state.cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }))
      },

      decreaseQuantity: id => {
        set(state => {
          const targetItem = state.cartItems.find(item => item.id === id)
          if (targetItem && targetItem.quantity <= 1) {
            return { cartItems: state.cartItems.filter(item => item.id !== id) }
          }
          return {
            cartItems: state.cartItems.map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            ),
          }
        })
      },

      clearCart: () => set({ cartItems: [] }),

      getCartCount: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'flower-shop-cart',
    },
  ),
)
