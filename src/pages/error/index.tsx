import { Link } from 'react-router-dom'

export function ErrorPage() {
  return (
    <div className='flex flex-col items-center gap-8 h-screen'>
      <h1 className='text-7xl font-bold'>404</h1>
      <h2 className='font-medium italic'>Ops! Está página não existe...</h2>
      <Link to={'/'} className='bg-slate-600 py-2 px-4 rounded select-none text-white'>
        Voltar aos produtos
      </Link>
    </div>
  )
}
