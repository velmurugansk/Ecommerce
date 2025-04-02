import logo from '../src/assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import user from "./assets/user.png";
import { logout } from './reducers/userAuthenticate';
import {logoutState} from './reducers/authReducer'
import api from './api/api';
import { persistor } from './store/store';
import { useContext, useEffect, useState } from 'react';
// import cartContext from "./contextdata"
import {cartContext} from './Cart'

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticate);
  const userid = useSelector((state) => state.cookieAuth.user);
  const uid = userid && userid.id ? userid.id : ''; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartCount, getCartdetails} = useContext(cartContext);    
  const sesionLogout = async () => {
    await api.post('/logout');
    await persistor.purge();
    dispatch(logout());
    dispatch(logoutState());
    navigate("/login"); 
  }

  const [userData, setUserdata] = useState('');
  const getUserdetail = async () => {
    let query = { id: uid };
    const response = await api.post('user/list', query);
    if (response.data.status) {
      setUserdata(response.data.data);
    } else {
      console.log(response)
    }
  } 

  useEffect(()=>{      
    getCartdetails();
    getUserdetail();
  }, [uid])

  
  return (
    <div className="flex fixed bg-white px-6 py-2 z-10 items-center justify-between w-full shadow-lg">
      <Link className='mr-2 ml-2 text-lg hover:text-[#578FCA]' to="/"><img src={logo} alt="logo" className='h-12 w-20' /></Link>            
      <div className='flex items-center'>
        <div className="relative mr-2">
          <Link to="/cart"><IoCartOutline className='mr-2 text-2xl cursor-pointer' /></Link>          
          {cartCount > 0 && isAuthenticated ?
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartCount}
            </span>
          : ''}
        </div>
        {isAuthenticated ? <div className='group relative'><div className='flex items-center capitalize'>
        <img src={user} className='h-10 w-10 mr-2 ml-2' alt="user image" />{userData && 'name' in userData ? userData.name : ''}</div>
        <div className="absolute z-50 hidden pt-1 right-1 group-hover:flex">
        <div className="w-full rounded-md border border-gray-200 bg-white opacity-0 shadow-lg transition-opacity duration-300 p-2 group-hover:opacity-100 divide-y divide-gray-100">          
          <Link className='text-base hover:text-[#578FCA]' to="">Profile</Link><br />
          <Link className='text-base hover:text-[#578FCA]' to="">Orders</Link>                    
          <button className='flex items-center text-base cursor-pointer' onClick={sesionLogout}>Logut</button>
        </div>
      </div></div> : ''}
        {isAuthenticated ? '' : <button className='px-2 py-1 cursor-pointer bg-blue-400 text-white rounded-md'>
          <Link className='mr-2 ml-2 text-lg  hover:text-[#578FCA]' to="/login">Login</Link></button>}

      </div>
    </div>
  )
}

export default Header