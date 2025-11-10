
import Navbar from '../components/Header/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';



const RootLayout = () => {
    return (
        <div>
             <div className='w-11/12 mx-auto py-2 max-w-7xl '>
            <Navbar></Navbar>

<main className='w-11/12 mx-auto py-2 max-w-7xl'>
<Outlet></Outlet>


</main> 
            <Footer></Footer>
        </div>
        </div>
    );
}

export default RootLayout;
