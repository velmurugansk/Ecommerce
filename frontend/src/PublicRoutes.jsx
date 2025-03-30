import Products from "./views/products/Products"
import Productsdetail from "./views/products/Productsdetail"
import Login from "./views/auth/Login"
import Layout from "./Layout"
import Home from "./views/Home"
import Notfoundpage from "./views/Notfoundpage"


const PublicRoutes = [{
    path: "/",
    element : <Layout/>,
    children:[
        { index: true, element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:productId', element: <Productsdetail /> },
        { path: '*', element: <Notfoundpage /> },
    ]
},{
    path: "/login",
    element : <Login/>
}]

export default PublicRoutes