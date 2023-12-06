import { createContext, ReactNode, useState } from 'react'
import { ProductsProps } from '../pages/home'

interface CartProps {
  id: number
  title: string
  description: string
  price: number
  cover: string
  amount: number
  total: number
}

interface CartContextData {
  cart: CartProps[]
  cartAmount: number
  totalCart: string
  addItemCart: (newItem: ProductsProps) => void
  removeItemCart: (product: CartProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [totalCart, setTotalCart] = useState('')

  function addItemCart(newItem: ProductsProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id)

    if (indexItem !== -1) {
      const cartList = [...cart]
      cartList[indexItem].amount = cartList[indexItem].amount + 1
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
      setCart(cartList)
      totalResultCart(cartList)
      return
    }
    const data: CartProps = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    }
    setCart((products) => [...products, data])
    totalResultCart([...cart, data])
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id)

    if (cart[indexItem].amount > 1) {
      const cartList = [...cart]
      cartList[indexItem].amount = cartList[indexItem].amount - 1
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
      setCart(cartList)
      totalResultCart(cartList)
      return
    }

    const removeItem = cart.filter((item) => item.id !== product.id)
    setCart(removeItem)
    totalResultCart(removeItem)
  }

  function totalResultCart(product: CartProps[]) {
    const result = product.reduce((acc, obj) => {
      return acc + obj.total
    }, 0)
    const resultFormated = result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    setTotalCart(resultFormated)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        totalCart,
        addItemCart,
        removeItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
