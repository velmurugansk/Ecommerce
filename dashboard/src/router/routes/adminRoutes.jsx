import { lazy } from "react"

const Admindashboard = lazy(() => import('../../views/admin/Admindashboard'));

const adminRoutes = [
    {
        path: '/admin/dashboard',
        element: <Admindashboard/>,
        ability:['admin', 'seller']
    }
]

export default adminRoutes