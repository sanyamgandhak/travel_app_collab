"use client";
import { FC, useEffect, useState } from "react";
import Card from "./card";

interface Props {}

const Itinerary: FC<Props> = ({}) => {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("ItineraryResponse");
    // localStorage.setItem("imageMapUrl", JSON.stringify(false));
    localStorage.removeItem("imageMapUrl");
    if (!data) return;
    else {
      const parsedData = JSON.parse(data);
      const itineraryArray = parsedData.split(/Day \d+:/);
      itineraryArray.shift();
      setItinerary(itineraryArray);
    }
  }, []);

  return (
    <div className="mt-20 mx-[88px] pb-10 scrollbar">
      {itinerary.map((line, index) => {
        return <Card line={line} ParentIndex={index} key={index} />;
      })}
    </div>
  );
};

export default Itinerary;
