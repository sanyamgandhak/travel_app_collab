"use client";
import { FC, useEffect, useState } from "react";
<<<<<<< HEAD
import Card from './card'

=======
import Card from "./card";
>>>>>>> 1a84e24b18c89643e8727b0d72af434d94764b36

interface Props {}

const Itinerary: FC<Props> = ({}) => {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("ItineraryResponse");
    if (!data) return;
    else {
      const parsedData = JSON.parse(data);
      const itineraryArray = parsedData.split(/Day \d+:/);
      itineraryArray.shift();
      setItinerary(itineraryArray);
    }
  }, []);

  return (
<<<<<<< HEAD
      <div className="mt-20 mx-[88px] pb-10 scrollbar">
        {itinerary.map((line, index) => {
          return <Card line={line} ParentIndex={index} key={index}/>;
        })
        }
      </div>
=======
    <div className="mt-20 mx-[88px] pb-10 scrollbar">
      {itinerary.map((line, index) => {
        return <Card line={line} ParentIndex={index} key={index} />;
      })}
    </div>
>>>>>>> 1a84e24b18c89643e8727b0d72af434d94764b36
  );
};

export default Itinerary;
