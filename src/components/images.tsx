"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { type } from 'os';

type coponentProps = {
  locationName: string
}


export default function Images({ locationName } : coponentProps) {
  const [imageUrl, setImageUrl] = useState("");

  const baseUrl = 'https://api.unsplash.com/search/photos'
  const client_id= '1MhvvHcnEtzcdNXhgTdh6_gtEN9Gt48oGW_TxyivX5o'

  useEffect(() => {
    const fetchImage = async () => {
      console.log(process.env.NEXT_PUBLIC_CLIENT_ID);
      const name = locationName.replace(/ /g, '-');
      const response = await fetch(`${baseUrl}?page=1&query=${name}&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`);
      const data = await response.json();
    
      for(const image of data.results) {
        const {description, alt_description} = image;
        const pattern = new RegExp(locationName.replace(/ /g, "\\s*"), "i");
        const match = description ? description.match(pattern) : alt_description ? alt_description.match(pattern) : null;
    
        if(match)  {
          console.log(image.urls.small);
          setImageUrl(image.urls.small);
          return;
        }
          // console.log(`${description}: ${image.urls.small}`);
      }
    }

    fetchImage();
  }, []);


  return (
    <>
    {imageUrl === "" ? <h1 className="relative m-auto top-1/2">Image preview is not available</h1> : <Image src={imageUrl} className="rounded-xl w-[100%] h-[274px]"alt="Place.png" width={300} height={274}></Image> 
    }
    </>
  )
}

