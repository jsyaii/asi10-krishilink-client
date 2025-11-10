import React, { Children } from 'react';

import { createBrowserRouter } from "react-router";

// import HomeLayouts from '../Layouts/HomeLayouts';
// import Root from '../Root/Root';
import HomeLayouts from '../Layouts/HomeLayouts';
import Root from '../Root/Root';
import AllCrops from '../pages/AllCrops/AllCrops';





const router = createBrowserRouter ([
  {
   path: "/",
   element: <Root/>,
   Children: [
// {

{
    Component: <HomeLayouts></HomeLayouts>,
    index: true,
      },



 {
        path: "all-crops/:id",
        element: <AllCrops />,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/crops/${params.id}`);
          if (!res.ok) throw new Error("Failed to fetch crop");
          return res.json();
        },
      }

// {


 
//    //      path:"all-crops/:id",
//    //      loader: ({params}) => fetch(`http://localhost:3000/crops/${params.id}`),
//    //    //   loader: ({params}) => fetch(`http://localhost:3000/all-crops/${params.id}`),
//    //  Component: <AllCrops/>
   
       
//         path: "all-crops/:id",
//         element: <AllCrops />,
//         loader: async ({ params }) => {
//           const res = await fetch(`http://localhost:3000/crops/${params.id}`);
//           if (!res.ok) throw new Error("Failed to fetch crop");
//           return res.json();
        

// },

   // index:true,
   //              path:"/",
   //              element:<HomeLayouts></HomeLayouts>

   //          },


   ]
},
]) 

export default router;
