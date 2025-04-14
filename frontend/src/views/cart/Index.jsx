import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cartContext } from '../../Cart';
import { IoTrashOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";

const tableHeader  = ['Item', 'Price', 'Quantity', 'Total'];

const Index = () => {
  const userid = useSelector((state) => state.cookieAuth.user);
  const uid = userid && userid.id ? userid.id : ''; 
  const {cartProducts, getCartdetails} = useContext(cartContext);
  
  console.log(uid)
  useEffect(()=>{      
    getCartdetails();    
  }, [uid])

  console.log(cartProducts)
  if(cartProducts && cartProducts.length === 0) {
    return (<div className="px-4 pt-20 xl:px-24 xl:pt-20 pb-3 h-min">
      <div className="flex justify-center">
        <p>Your cart is currently empty!</p>
      </div></div>)
  }

  return (
    <div className="px-4 pt-20 xl:px-24 xl:pt-20 pb-3 h-min">
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <table className="table-auto w-full">
                  <thead style={{background:'rgb(232 232 232)'}}>
                    <tr>
                      {tableHeader.map((item, indx) => {
                        return <th className='px-2 py-4' key={indx}>{item}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map(item => {
                      let price = item.quantity > 0 ? item.quantity * item.price : item.price;
                      return <tr key={item.productId}><td className='p-2'>{item.name}</td>
                      <td className='p-2'><div className='flex items-center justify-center'><LiaRupeeSignSolid className='mr-1' />{item.price}</div></td>
                      <td className='p-2'>{item.quantity}</td><td className='p-2'><div className="flex justify-between items-center">
                        <div className='flex items-center'><LiaRupeeSignSolid className='mr-1' />{price}</div> <IoTrashOutline className='cursor-pointer' /></div></td></tr>
                    })}
                  </tbody>
              </table>
            </div>
            <div className="col-span-1">
                <div className="bg-white border-gray-300 border-1 p-3">
                    <p className="text-2xl font-bold border-b border-gray-300 pb-4">Order Summary</p>   
                    <div className="flex items-center justify-between p-2">
                      <p>Sub Total</p> <p><LiaRupeeSignSolid className='mr-1' /></p>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <p>Shipping</p> <p>Free</p>
                    </div>   
                    <div className="flex items-center justify-between p-2">
                      <p>Total</p> <p><LiaRupeeSignSolid className='mr-1' /></p>
                    </div>                                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index