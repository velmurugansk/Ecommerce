import { useState } from "react"
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'; 
import { userLogin } from "../../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import logo from '../../assets/logo.png'

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    email: '',
    password: ''
  });

  const updateChanges = (e) => {
    e.preventDefault();
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = dispatch(userLogin(userdata));    
    data.then(unwrapResult)
      .then((response) => {        
        const result =  response.data.status;   
        const token = response.data.token;
        if(result) {
          toast.success(response.data.message);
          localStorage.setItem("token",token)
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
        
      })
      .catch((error) => {
        console.error('Error:', error); // Handle errors
      });
      
  }

  return (
    <div className="bg-[#C4D9FF] h-screen w-screen p-2 flex justify-center items-center">
      <div className="w-[23.75rem] bg-white h-[25rem] xs:h-[28.125rem] xs:w-[18.75rem] p-2 rounded-lg">
        <div className="py-15 px-1">
          <div className="flex justify-center pb-2">
            <img src={logo} alt="logo" />
          </div>          
          <div className="mb-6">
            <input type="email" placeholder="Email" required name="email" onChange={updateChanges} value={userdata.email}
              className="w-full outline-0 focus:outline-1 h-10 p-2 rounded-lg border-1 border-[#ccc] focus:border-[#5382d8]" />
          </div>
          <div className="mb-6">
            <input type="password" placeholder="Password" required name="password" onChange={updateChanges} value={userdata.password}
              className="w-full outline-0 focus:outline-1 h-10 p-2 rounded-lg border-1 border-[#ccc] focus:border-[#5382d8]" />
          </div>
          <button className="w-full mt-2 bg-[#5382d8] p-2 text-white rounded-lg cursor-pointer" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login