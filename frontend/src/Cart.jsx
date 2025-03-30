import { createContext, useState } from "react";
import api from "./api/api";
import { useSelector } from 'react-redux'

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const userid = useSelector((state) => state.cookieAuth.user);
    const [cartCount, setCartcount] = useState(0);
    let uid = userid && userid.id ? userid.id : '';
    const getCartdetails = async () => {
        if (uid) {
            let query = { userId: uid }
            const fetchCartdetails = await api.get('cart/list', { params: query });
            if (fetchCartdetails.data.data) {
                let resultData = fetchCartdetails.data.data
                let produtData = resultData.products && resultData.products.length > 0 ? resultData.products : [];
                let count = produtData && produtData.length > 0 ? produtData.length : 0;
                setCartcount(count);
            }
        } else {
            setCartcount(0);
        }
    }

    const value = { cartCount, getCartdetails };

    return (
        <cartContext.Provider value={value}>
            {children}
        </cartContext.Provider>
    )
}