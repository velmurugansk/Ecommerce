import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminlogin, messageClear } from "../../store/Reducers/authReducers";
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { loader, errorMessage, sucessMessage } = useSelector(state => state.auth)

  const [userData, setUserdata] = useState({
    email: '',
    password: ''
  })

  const updateValues = (e) => {
    setUserdata({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminlogin(userData))
  }

  const overrideStyle = {
    margin: "0 auto",
    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
  }

  useEffect(()=>{
    if(errorMessage){
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if(sucessMessage) {
      toast.success(sucessMessage);      
      navigate('/')
      dispatch(messageClear());
    }
  },[dispatch, errorMessage, navigate, sucessMessage])

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#c5c1e7]">
      <div className="w-[350px] text-white bg-[#6f68d1]  rounded-md">
        <div className="p-4">
          <div className="flex justify-center items-center h-[70px]">
            <div className="w-[180px] h-[50px]">
              <img src="http://localhost:5173/logo.png" alt="logo" className="h-full w-full" />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
                  border-slate-400"  placeholder="Email" name="email" id="email" onChange={updateValues} value={userData.email} required />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
                  border-slate-400"  placeholder="Password" name="password" id="password" onChange={updateValues} value={userData.password} required />
            </div>

            <button disabled={loader ? true : false} className="w-full bg-slate-800 hover:shadow-blue-300 hover:shadow-lg text-white
                rounded-md py-2 px-7 mb-3 cursor-pointer">{loader ? <ClipLoader size={20} color="#fff" cssOverride={overrideStyle} /> : 'Login'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Adminlogin