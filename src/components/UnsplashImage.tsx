"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";


type Props = {
  locationName: string;
};

export default function Images({ locationName }: Props) {
  const [imageUrl, setImageUrl] = useState("");

  const placeBaseUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
  const photoBaseUrl = "https://maps.googleapis.com/maps/api/place/photo";

  useEffect(() => {
    const fetchImage = async () => {
      const location = JSON.parse(localStorage.getItem("location"));
      const specificLocationName = `${locationName} ${location}`
      console.log(specificLocationName);
      const name = specificLocationName.replace(/ /g, "%20");
      const response = await fetch(
        `${placeBaseUrl}?input=${name}&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry%2Cphoto%2Cplace_id&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
      );
      const results = await response.json();
      const storedPlaceIdArray = JSON.parse(localStorage.getItem("ImageMapUrl"));
      storedPlaceIdArray[locationName]  = results.candidates[0].place_id;
      localStorage.setItem("ImageMapUrl", JSON.stringify(storedPlaceIdArray));
      
      if(results.candidates[0].hasOwnProperty('photos')) {
        const photo_reference = results.candidates[0].photos[0].photo_reference;
        const photoRes = await fetch(
          `${photoBaseUrl}?maxwidth=400&photo_reference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
        );
  
        setImageUrl(photoRes.url);
      }

    };

    fetchImage();
  }, [locationName]);

  return (
    <>
      {imageUrl === "" ? (
        <h1 className="relative m-auto top-1/2">
          Image preview is not available
        </h1>
      ) : (
        <Image
          src={imageUrl}
          className="rounded-xl w-[100%] h-[274px]"
          alt="Place.png"
          width={300}
          height={274}
        />
      )}
    </>
  );
}
