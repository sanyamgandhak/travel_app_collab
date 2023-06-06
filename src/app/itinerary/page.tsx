"use client";
import { FC, useEffect, useState } from "react";
import Card from "./card";

interface Props {}

type dateType = {
  day: string;
  month: string;
  date: string
}


const Itinerary: FC<Props> = ({}) => {
  const [itinerary, setItinerary] = useState([]);
  const [date, setDate] = useState<Array<dateType>>([{day: " ", month: " ", date: " "}]);

  const formatDate = (date: number): string => {
    let value: string;
    switch(date) {
      case 1:
        value = `${date}st`;
        break;
      case 2:
        value = `${date}nd`;
        break;
      case 3:
        value = `${date}rd`;
        break;
      default:
        value = `${date}th`;
    }
    return value;
  }

  const parseDate = (): void => {
    const dateString = localStorage.getItem('date');
    const dateObj = dateString && JSON.parse(dateString);

    const options: {} = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newStartDate = new Date(dateObj.startDate);
    const newEndDate = new Date(dateObj.endDate);

    const objArray = []
    while(newStartDate.getTime() != newEndDate.getTime()) {
      const dateString = newStartDate.toLocaleDateString(undefined, options);
      const dateArray = dateString.split(/[,\s]+/);
      const formatedDate = formatDate(parseInt(dateArray[2]));
      const obj = {
        day: dateArray[0],
        month: dateArray[1],
        date: formatedDate 
      }
      objArray.push(obj);
      newStartDate.setDate(newStartDate.getDate() + 1);
    }
    setDate(objArray);
   
  }


  useEffect(() => {
    const data = localStorage.getItem("ItineraryResponse");
    localStorage.removeItem("imageMapUrl");
    parseDate();
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
        return <Card line={line} ParentIndex={index} dateObj={date[index%date.length]} key={index} />;
      })}
    </div>
  );
};

export default Itinerary;
