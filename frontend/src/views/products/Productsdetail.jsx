import CryptoJS from "crypto-js"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../api/api";
import { useEffect, useState, useContext } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import {cartContext} from '../../Cart'


const Productsdetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const decryptid = CryptoJS.AES.decrypt(decodeURIComponent(productId), 'productseasy');
  const decryptedId = decryptid ? decryptid.toString(CryptoJS.enc.Utf8) : '';
  const [productData, setproductData] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticate);
  const userid = useSelector((state) => state.cookieAuth.user);
  const [pquantity, setPquantity] = useState(1);
  const { getCartdetails} = useContext(cartContext);  

  const getProductdetails = async () => {
    try {
      let query = { _id: decryptedId };
      const response = await api.get('product/list', { params: query });
      if (response.data.status) {
        setproductData(response.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
  };

  const stockQuanitydropdowns = (stock) => {
    let options = [];
    for (let i = 1; i <= stock; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }


  const addtoCartproduct = async () => {    
    if (isAuthenticated) {      
      let uid = userid && userid.id ? userid.id : '';
      let obj = {
        userId: uid,
        productId: decryptedId,
        productIdString:decryptedId.toString(),
        quantity: Number(pquantity),
        price: productData.price,
        name: productData.title,
      }
      console.log(obj, pquantity)
      if (pquantity) {
        const addCartdetails = await api.post('cart/add', { params: obj });
        if (addCartdetails.data.status) {
          getCartdetails();
          toast.success(addCartdetails.data.message);
        } else {
          toast.error(addCartdetails.data.message);
        }
      }
    } else {
      navigate('/login');
    }
  }

  useEffect(() => {
    getProductdetails()
  }, [])

  return (
    <div className="px-4 pt-20 xl:px-24 xl:pt-20">
      {!isObjectEmpty(productData) ? <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4"><img src={productData.thumbnail} /></div>
        <div className="col-span-6"><h2 className="text-2xl font-medium">{productData.title}</h2>
          <p>{productData.description}</p></div>
        <div className="col-span-2">
          <div className="flex items-center"><LiaRupeeSignSolid /><p className="font-medium text-2xl">{productData.price}</p></div>
          {productData.stock > 0 ? <p className="font-medium text-[#007600] text-xl">In stock</p> : <p className="font-medium text-red-500 text-xl">Out of stock</p>}
          {productData.stock > 0 ? <div>
            <label>Quantity</label>
            <select id="quantityprod" onChange={(e) => setPquantity(e.target.value)} className="border-1 ml-2 text-[0.75rem]">{stockQuanitydropdowns(productData.stock)}</select>
          </div> : ''}
          <button className="px-3 py-2 rounded-md cursor-pointer bg-[#ffd814] mt-2" onClick={addtoCartproduct}>Add to Cart</button></div>
      </div> : ''}
    </div>
  )
}

export default Productsdetail