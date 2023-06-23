import axios from "axios";
import React, { useEffect, useState } from "react";

type props = {
  locationName: string;
};

export default function Distance({ locationName }: props) {
  const [dist, setDist] = useState<string>("0");
  const [flag, setFlag] = useState<boolean>(true);

  const baseUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?`;

  useEffect(() => {
    const fetchDistance = async () => {
      const distanceString = localStorage.getItem("distance");
      const distance = distanceString && JSON.parse(distanceString);

      const storedPlaceIdObjString = localStorage.getItem("imageMapUrl"); // geting the imageMapUrl from localstorage
      const storedPlaceIdObj =
        storedPlaceIdObjString && JSON.parse(storedPlaceIdObjString);

      const index = distance.indexOf(locationName);

      if (index == distance.length - 1) {
        setFlag(false);
        return;
      }

      const originPlaceId = storedPlaceIdObj[distance[index]];
      const destinationPlaceId = storedPlaceIdObj[distance[index + 1]];

      //Driving distance
      const distanceResponse = await axios.post(
        "/api/google-places-driving-distance-api",
        {
          originPlaceId,
          destinationPlaceId,
          baseUrl,
        }
      );

      const element = distanceResponse.data.rows[0].elements[0];

      if (
        element.hasOwnProperty("distance") &&
        element.distance.text !== "1 m"
      ) {
        const kms = element.distance.text;
        const km = kms.split(/\s+/);
        setDist(km[0]);
        // console.log(
        //   `${distance[index]} -> ${distance[index + 1]}, `,
        //   distanceResponse.data
        // );
      } else {
        //Walking Distance
        const distanceResponse = await axios.post(
          "/api/google-places-walking-distance-api",
          {
            originPlaceId,
            destinationPlaceId,
            baseUrl,
          }
        );

        const element = distanceResponse.data.rows[0].elements[0];

        if (element.hasOwnProperty("distance")) {
          const kms = element.distance.text;
          const km = kms.split(/\s+/);
          setDist(km[0]);
        }
        // console.log(
        //   `${distance[index]} -> ${distance[index + 1]}, `,
        //   distanceResponse.data
        // );
      }
    };

    fetchDistance();
  }, [baseUrl, locationName]);

  return (
    <>
      {flag ? (
        <div className="text-[16px] font-[400] non-italic font-Roboto tracking-[0.25px]">
          {(Number(dist) / 1.609).toFixed(1)} miles to next stop
        </div>
      ) : (
        <div>end</div>
      )}
    </>
  );
}
