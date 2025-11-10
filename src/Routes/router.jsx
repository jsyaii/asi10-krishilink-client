import React, { Children } from 'react';

import { createBrowserRouter } from "react-router";
import RootLayout from '../Root/RootLayout';
import HomeLayouts from '../Layouts/HomeLayouts';



const router = createBrowserRouter ([
  {
   path: "/",
   element: <RootLayout></RootLayout>,
   Children: [
{
                index: true,
// loader: () => fetch('/plants.json'),
//  hydrateFallbackElement: <Loading></Loading>,
                path:"/",
                element:<HomeLayouts></HomeLayouts>


            },


   ]
},
]) 

export default router;
