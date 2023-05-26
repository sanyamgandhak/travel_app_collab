"use client";
import { FC, useEffect, useState } from "react";
import ClientOnly from "../../components/ClientOnly";

interface Props {}

const Itinerary: FC<Props> = ({}) => {
  const [itinerary, setItinerary] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("ItineraryResponse");
    if (!data) return;
    else {
      const parsedData = JSON.parse(data);
      setItinerary(parsedData);
    }
  }, []);

  console.log(itinerary);
  return (
    <ClientOnly>
      <div></div>
    </ClientOnly>
  );
};

export default Itinerary;
