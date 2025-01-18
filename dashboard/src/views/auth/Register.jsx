import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-[#cdcae9]">
      <div className="w-[350px] text-white bg-[#6f68d1] rounded-md">
        <div className="p-4">
          <h2 className="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">Please register your account</p>
          <form>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
              border-slate-400"  placeholder="Name" name="name" id="name" required />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input type="text" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
              border-slate-400"  placeholder="Email" name="email" id="email" required />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="w-full px-2 py-1 outline-none rounded-md bg-transparent border
              border-slate-400"  placeholder="Password" name="password" id="password" required />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input type="checkbox" name="checkbox" id="checkbox" className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200
              rounded border-gray-300 focus:ring-blue-500" />
              <label htmlFor="checkbox">I agree to privacy policy & terms</label>
            </div>

            <button className="w-full bg-slate-800 hover:shadow-blue-300 hover:shadow-lg text-white
            rounded-md py-2 px-7 mb-3">Sign up</button>

            <div className="flex justify-center items-center w-full mb-3 gap-3">
              <p>Already have an account? <Link to="/login" className="font-bold">Login</Link></p>
            </div>
          </form>
        </div>        
      </div>
    </div>
  )
}

export default Register