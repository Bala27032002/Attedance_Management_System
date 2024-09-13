import { useLocation } from 'react-router';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import AllRoutes from './Routes/AllRoutes';

function App() {
  const location = useLocation();
  const loginpage=location.pathname==="/";
  return (
    <div >
     {!loginpage && <Navbar />} 
     <AllRoutes />
    </div>
  );
}

export default App;

