import Header from './Header';
import Footer from './Footer';
import { useLocation, Outlet } from 'react-router-dom';
import api from './api/api';
import { useDispatch } from 'react-redux';
import { setAuth, logout } from './reducers/userAuthenticate';
import { useEffect } from 'react';
// import cartContext from "./contextdata"
import { persistor } from './store/store';
import {CartProvider} from './Cart'

const Layout = () => {
  const location =useLocation();
  const dispatch = useDispatch();
  const isLoginpage = location.pathname === '/login';
  const isRegisterpage = location.pathname === '/register';

  const verifyAuth = async () => {
    try {
      const response = await api.get('verify');
      dispatch(setAuth(response.data.user));
    } catch (error) {      
      dispatch(logout());
      await persistor.purge();
    }
  }

  useEffect(()=>{
    verifyAuth();      
  }, [dispatch])

  if(isLoginpage || isRegisterpage) {
    return <Outlet/>
  }
  
  return (
    <>
    <CartProvider>
    <Header />
      <Outlet/>
    <Footer />
    </CartProvider>
    </>
  )
}

export default Layout