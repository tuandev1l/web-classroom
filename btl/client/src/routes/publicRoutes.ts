import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import Welcome from '../components/common/Welcome';

const publicRoutes = [
  {
    path: '/',
    element: Welcome,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/signup',
    element: Signup,
  },
];

export default publicRoutes;
