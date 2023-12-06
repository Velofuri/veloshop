import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsCartPlus, BsArrowBarLeft } from 'react-icons/bs'
import { ProductsProps } from '../home'
import { api } from '../../services/api'
import { CartContext } from '../../contexts/CartContext'
import toast from 'react-hot-toast'

export function ProductDetail() {
  const [product, setProduct] = useState<ProductsProps>()

  const { id } = useParams()

  const { addItemCart } = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`products/${id}`)
      setProduct(response.data)
    }
    getProduct()
  }, [id])

  function handleAddItems(product: ProductsProps) {
    toast.success('Produto adiciondo no carrinho')
    addItemCart(product)
    navigate('/cart')
  }

  return (
    <main className='w-full max-w-7xl px-4 mx-auto my-6'>
      {product && (
        <section className='w-full'>
          <div className='relative flex flex-col md:flex-row'>
            <Link to={'/'} className='absolute left-8 top-1 p-3 rounded-md bg-slate-600'>
              <BsArrowBarLeft size={24} color={'#FFF'} />
            </Link>
            <img
              src={product.cover}
              alt={product.title}
              className='flex-1 w-full max-h-72 object-contain'
            />
            <div className='flex-1'>
              <p className='font-bold text-2xl mt-4 mb-2'>{product.title}</p>
              <p className='my-4'>{product.description}</p>
              <strong className='text-zinc-700/90 text-xl'>
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>
              <button
                onClick={() => handleAddItems(product)}
                className='bg-zinc-900 p-1 rounded ml-3'
              >
                <BsCartPlus size={20} color='#FFF' />
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
