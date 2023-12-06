import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Cart } from './pages/cart'
import { ProductDetail } from './pages/productDetail'

import { Layout } from './components/layout'
import { ErrorPage } from './pages/error'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
])

export { router }
