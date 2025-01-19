import { lazy } from "react"

const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/Register'));
const Adminlogin = lazy(() => import('../../views/auth/Adminlogin'));

const publicRoutes = [
  { 
    path: 'login',
    element: <Login/>
  },
  {
    path: 'register',
    element: <Register/>
  },
  {
    path: 'admin/login',
    element: <Adminlogin/>
  }
];

export default publicRoutes

