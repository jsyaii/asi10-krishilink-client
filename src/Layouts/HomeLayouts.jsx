import React from 'react';
import Banner from '../pages/Banner/Banner';
import LatestCrops from '../pages/LatestCrops/LatestCrops';




const LatestCropsPromise = fetch('http://localhost:3000/latest-crops')
.then(res => res.json());
const HomeLayouts = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto py-10'>
          <Banner></Banner>
          

<LatestCrops LatestCropsPromise={LatestCropsPromise}></LatestCrops>


        </div>
        </div>
    );
}

export default HomeLayouts;
