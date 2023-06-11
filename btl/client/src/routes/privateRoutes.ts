import Book from '../components/books/BookDetail';
import BookTable from '../components/books/Books';
import Cart from '../components/carts/Cart';
import Stripe from '../components/purchase/Stripe';
import Success from '../components/purchase/Success';
import OrderDetail from '../orders/OrderDetail';
import Orders from '../orders/Orders';

const privateRoutes = [
  {
    path: '/books',
    element: BookTable,
  },
  {
    path: '/books/:id',
    element: Book,
  },
  {
    path: '/cart',
    element: Cart,
  },
  {
    path: '/orders',
    element: Orders,
  },
  {
    path: '/orders/:id',
    element: OrderDetail,
  },
  {
    path: '/stripe',
    element: Stripe,
  },
  {
    path: '/success',
    element: Success,
  },
];

export default privateRoutes;
