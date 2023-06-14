"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { axiosInstance } from "@/libs/config";

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

      const response = await axiosInstance.post("/api/google-places-placeId-api",{
        placeName,placeBaseUrl
      });

      const results = response.data;

      const storedPlaceIdObjString = localStorage.getItem("imageMapUrl"); // geting the imageMapUrl from localstorage
      const storedPlaceIdObj = storedPlaceIdObjString
        ? JSON.parse(storedPlaceIdObjString)
        : {};

      if (results?.candidates[0]?.hasOwnProperty("place_id")) {
        const place_id = results.candidates[0].place_id;
        locationRef.current = place_id;
        storedPlaceIdObj[locationName] = place_id;
        localStorage.setItem("imageMapUrl", JSON.stringify(storedPlaceIdObj));
      }

      if (results.candidates[0]?.hasOwnProperty("photos")) {
        const photo_reference = await results.candidates[0].photos[0].photo_reference;
        const response = await axiosInstance.post("/api/google-places-photos-api",{
          photoBaseUrl,photo_reference
        });
        setImageUrl(response.data);
      }
    };

    fetchImage();
  }, [locationName]);

  return (
    <>
      {imageUrl === "" ? (
        <h1 className="border-2 border-gray-500/50 border-dashed rounded-xl w-[100%] h-[202px] flex justify-center items-center">
          Image preview is not available
        </h1>
      ) : (
        <Image
          src={imageUrl || ""}
          className="rounded-xl w-[100%] h-[202px] object-cover"
          alt="Place.png"
          width={300}
          height={274}
        />
      )}
    </>
  );
}