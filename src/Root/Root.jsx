import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';

// import HomeLayouts from '../Layouts/HomeLayouts';
import { Outlet } from 'react-router';



const Root = () => {
    return (
        
             <div className='w-11/12 mx-auto py-2 max-w-7xl '>
            <Navbar></Navbar>
<main className='w-11/12 mx-auto py-2 max-w-7xl'>
<Outlet></Outlet>

</main> 
            <Footer></Footer>
        </div>
       
    );
}

export default Root;
