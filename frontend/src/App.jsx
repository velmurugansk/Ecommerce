
import { useRoutes } from 'react-router-dom';
import publicRoutes from './PublicRoutes';

function App() {
  const routes = useRoutes(publicRoutes);
  
  return (
    <>      
      {routes}         
    </>
  )
}

export default App
