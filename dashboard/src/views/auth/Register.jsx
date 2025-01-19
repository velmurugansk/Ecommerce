import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

const Register = () => {

  const [registerdata, setRegisterdata] = useState({
    name : '',
    email:'',
    password:''
  });

  const updateChanges = (e) => {
    setRegisterdata({...registerdata, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(registerdata)
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#c5c1e7]">
      <div className="w-[350px] text-white bg-[#6f68d1]  rounded-md">
        <div className="p-4">
          <h2 className="text-xl mb-3 text-center font-bold">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">Please register your account</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
              border-slate-400"  placeholder="Name" name="name" id="name" value={registerdata.name} onChange={updateChanges} required />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
              border-slate-400"  placeholder="Email" name="email" id="email" value={registerdata.email} onChange={updateChanges} required />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
              border-slate-400"  placeholder="Password" name="password" id="password" value={registerdata.password} onChange={updateChanges} required />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input type="checkbox" name="checkbox" id="checkbox" className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200
              rounded border-gray-300 focus:ring-blue-500" />
              <label htmlFor="checkbox">I agree to privacy policy & terms</label>
            </div>

            <button className="w-full bg-slate-800 hover:shadow-blue-300 hover:shadow-lg text-white
            rounded-md py-2 px-7 mb-3 cursor-pointer">Sign up</button>

            <div className="flex justify-center items-center w-full mb-3 gap-3">
              <p>Already have an account? <Link to="/login" className="font-bold cursor-pointer">Sign in</Link></p>
            </div>

            <div className="flex items-center justify-center w-full mb-3">
              <div className="bg-slate-700 w-[45%] h-[1px]"></div>
              <div className="flex w-[10%] justify-center items-center"><span>or</span></div>
              <div className="bg-slate-700 w-[45%] h-[1px]"></div>
            </div>

            <div className="flex items-center gap-3 mb-3 justify-center">
              <div className="w-[40%] h-[2.188rem] flex justify-center items-center gap-2 cursor-pointer bg-orange-700 shadow-lg
              hover:shadow-bg-orange-700/50 rounded-md" title="continue with google">
                <FaGoogle /> Google
              </div>
              <div className="w-[40%] h-[2.188rem] flex justify-center items-center gap-2 cursor-pointer bg-blue-700 shadow-lg
              hover:shadow-bg-700/50 rounded-md" title="continue with facebook">
                <FaFacebook /> Facebook
              </div>
            </div>
          </form>
        </div>        
      </div>
    </div>
  )
}

export default Register