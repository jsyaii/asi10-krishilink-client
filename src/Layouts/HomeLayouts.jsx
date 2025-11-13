import React from 'react';
import Banner from '../pages/Banner/Banner';
import LatestCrops from '../pages/LatestCrops/LatestCrops';
import WorkSection from '../pages/WorkSection/WorkSection';
import Blogs from '../pages/Blogs/Blogs';
import PlantCareTips from '../pages/careTips/careTips';
import GreenExperts from '../pages/GreenExperts/GreenExperts';

const LatestCropsPromise = fetch('https://krishilink-server-khaki.vercel.app/latest-crops')
.then(res => res.json());
const HomeLayouts = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto py-10'>
          <Banner></Banner>
          

<LatestCrops LatestCropsPromise={LatestCropsPromise}></LatestCrops>

<WorkSection></WorkSection>
<Blogs></Blogs>
<PlantCareTips></PlantCareTips>
<GreenExperts></GreenExperts>
        </div>
        </div>
    );
}

export default HomeLayouts;
