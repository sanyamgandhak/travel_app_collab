"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

type Props = {
  locationName: string;
};

export default function Images({ locationName }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const locationRef = useRef(locationName);

  const placeBaseUrl =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
  const photoBaseUrl = "https://maps.googleapis.com/maps/api/place/photo";

  useEffect(() => {
    const fetchImage = async () => {
      const locationString = localStorage.getItem("location"); // geting the location value from localstorage
      const location =
        locationString !== null ? JSON.parse(locationString) : null;
      const specificLocationName: string = `${locationName} ${location}`;
      const placeName: string = specificLocationName.replace(/ /g, "%20");

      const response = await axios.get(
        `${placeBaseUrl}?input=${placeName}&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry%2Cphoto%2Cplace_id&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
      );

      const results = response.data;

      const storedPlaceIdObjString = localStorage.getItem("imageMapUrl"); // geting the imageMapUrl from localstorage
      const storedPlaceIdObj = storedPlaceIdObjString
        ? JSON.parse(storedPlaceIdObjString)
        : {};

      if (results.candidates[0]?.hasOwnProperty("place_id")) {
        // seting the imageMapUrl in localstorage
        const place_id = results.candidates[0].place_id;
        locationRef.current = place_id;
        storedPlaceIdObj[locationName] = place_id;
        localStorage.setItem("imageMapUrl", JSON.stringify(storedPlaceIdObj));
      }

      if (results.candidates[0]?.hasOwnProperty("photos")) {
        const photo_reference = results.candidates[0].photos[0].photo_reference;
        const photoRespose = await fetch(
          `${photoBaseUrl}?maxwidth=1600&maxheight=1600&photo_reference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
        );
        setImageUrl(photoRespose.url);
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
          src={imageUrl || ""}
          className="rounded-xl w-[100%] h-[274px] object-cover"
          alt="Place.png"
          width={300}
          height={274}
        />
      )}
    </>
  );
}
