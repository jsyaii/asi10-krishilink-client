import React from 'react';
import { createBrowserRouter } from "react-router";
import HomeLayouts from '../Layouts/HomeLayouts';
import Root from '../Root/Root';
// import LogIn from '../pages/LogIn/LogIn';
// import Register from '../pages/Register/Register';
import AllCrops from '../pages/AllCrops/AllCrops';
import CropDetails from '../pages/CropDetails/CropDetails';
import Login from '../pages/LogIn/LogIn';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import AddCrop from '../pages/AddCrop/AddCrop';
import MyPost from '../pages/MyPost/MyPost';
import MyInterest from '../pages/MyInterest/MyInterest';
import MyInterests from '../pages/MyInterest/MyInterest';
import PrivateRoute from './PrivateRoute';
import InterestForm from '../pages/MyFrom/MyFrom';
import ForgotPassword from '../pages/ForgotPass/ForgotPass';
import ErrorPage from '../pages/Error/Error';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <HomeLayouts />,
        index: true, 
      },
      {
        path: "/login",
        element: <Login/>,
      },

 {
  path: "/my-from",
  element: <InterestForm/>
},
{
  path: "/auth/forgot-password",
  element: <ForgotPassword></ForgotPassword>,
},
{
        path:'/*',
        element:<ErrorPage></ErrorPage>
    },

 

      {
        path: "/auth/register",
        element: <Register/>,
      },
      {
        path: "/profile",

        element:<PrivateRoute>
  <Profile/>,
        </PrivateRoute>
       
      },
      {
        path: "/add-crop",
        element: <PrivateRoute>
           <AddCrop/>,
        </PrivateRoute>
       
      },
      {
        path: "/my-posts",
        element: <PrivateRoute>
            <MyPost/>,
        </PrivateRoute>
        
      },
     {
  path: "/my-interests",
  element: (
   <PrivateRoute>
 <MyInterests />
   </PrivateRoute>
     
     
    
  ),
},
      {
        path: "/all-crops",
        element: <AllCrops />,
      },
      {
  path: "/crops/:id",
  element: <CropDetails/>,
},
     






    ],
  },
]);

export default router;




// import React, { Children } from 'react';
// import { createBrowserRouter } from "react-router";
// import HomeLayouts from '../Layouts/HomeLayouts';
// import Root from '../Root/Root';
// import LogIn from '../pages/LogIn/LogIn';
// import Register from '../pages/Register/Register';
// import AllCrops from '../pages/AllCrops/AllCrops';



// const router = createBrowserRouter ([
//   {
//    path: "/",
//    element: <Root/>,
//    Children: [
// {
//     Component: <HomeLayouts></HomeLayouts>,
//     index: true,
//       },
//       {
// path: "/login",
// element: <LogIn></LogIn>,

//       },
//       {
// path: "/register",
// element: <Register></Register>,

//       },
//       {
// path: "/all-crops",
// element: <AllCrops></AllCrops>,

//       }


//    ]
// },
// ]) 

// export default router;
