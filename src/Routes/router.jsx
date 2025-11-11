import React from 'react';
import { createBrowserRouter } from "react-router";
import HomeLayouts from '../Layouts/HomeLayouts';
import Root from '../Root/Root';
import LogIn from '../pages/LogIn/LogIn';
import Register from '../pages/Register/Register';
import AllCrops from '../pages/AllCrops/AllCrops';
import CropDetails from '../pages/CropDetails/CropDetails';

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
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-crops",
        element: <AllCrops />,
      },
      {
  path: "/crops/:id",
  element: <CropDetails/>,
}
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
