import { Link } from "react-router-dom"
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-[#131A22] px-4 py-5">
      <div className="flex justify-center items-center gap-4">
        <Link className='text-base text-white' to="">Conditions of Use & Sale</Link>
        <Link className='text-base text-white' to="">Privacy Notice</Link>
        <Link className='text-base text-white' to="">Interest-Based Ads</Link>
      </div>
      <div className="flex items-center justify-center my-1">
        <AiOutlineCopyright className="mr-1 text-white"/><p className="text-white">{date.getFullYear()}, Easy Shop.in</p>
      </div>
    </div>
  )
}

export default Footer