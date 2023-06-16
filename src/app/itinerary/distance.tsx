import axios from 'axios';
import React, { useEffect, useState } from 'react'

type props = {
  locationName: string;
}

export default function Distance({ locationName }: props) {
  const [dist, setDist] = useState<string>('2.6');
  const [flag, setFlag] = useState(true)

  useEffect(()=> {
    const fetchDistance = async () => {
    
      const distanceString = localStorage.getItem("distance");
      const distance = distanceString && JSON.parse(distanceString);

      const storedPlaceIdObjString = localStorage.getItem("imageMapUrl"); // geting the imageMapUrl from localstorage
      const storedPlaceIdObj = storedPlaceIdObjString && JSON.parse(storedPlaceIdObjString);

      const index = distance.indexOf(locationName);
      // console.log(distance.length, index);
      
      if(index == distance.length - 1) {
        setFlag(false);
        return;
      }

      const originPlaceId = storedPlaceIdObj[distance[index]];
      const destinationPlaceId = storedPlaceIdObj[distance[index+1]];


       const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`);

      //  console.log(`${distance[index]} -> ${distance[index+1]}, `,distanceResponse.data);
       const kms = distanceResponse.data.rows[0].elements[0].distance.text;
       const km = kms.split(/\s+/);
       setDist(km[0]);
      // console.log(km[0]);
    }

    fetchDistance();
  }, [locationName])

  return (
    <>
      {flag 
      ? <div className='text-[16px] font-[400] non-italic font-Roboto tracking-[0.25px]'>{(Number(dist) / 1.609).toFixed(1)} miles to next stop</div>
      : <div>end</div>
      }
    </>
  )
}
