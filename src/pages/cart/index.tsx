import { useContext } from 'react'

import { CartContext } from '../../contexts/CartContext'
import { Link } from 'react-router-dom'

export function Cart() {
  const { cart, addItemCart, removeItemCart, totalCart } = useContext(CartContext)
  return (
    <div className='w-full max-w-7xl px-5 mx-auto'>
      <h1 className='font-medium text-2xl text-center my-4'>Meu carrinho</h1>

      {cart.length === 0 && (
        <div className='flex flex-col items-center justify-center'>
          <p className='font-medium'>Ops seu carrinho está vazio...</p>
          <Link
            to='/'
            className='bg-slate-600 my-3 py-1 px-3 rounded flex items-center justify-center text-white font-medium'
          >
            Acessar produtos
          </Link>
        </div>
      )}

      {cart.map((product) => (
        <section
          key={product.id}
          className='flex items-center justify-between border-b-2 border-gray-300'
        >
          <img src={product.cover} alt={product.title} className='w-28' />

          <strong>
            Preço:{' '}
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>

          <div className='flex items-center justify-center gap-3'>
            <button
              onClick={() => removeItemCart(product)}
              className='bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center'
            >
              -
            </button>
            <p>{product.amount}</p>
            <button
              onClick={() => addItemCart(product)}
              className='bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center'
            >
              +
            </button>
          </div>

          <strong className='float-right'>
            SubTotal:{' '}
            {product.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && <p className='font-bold mt-4'>Total: {totalCart}</p>}
    </div>
  )
}
