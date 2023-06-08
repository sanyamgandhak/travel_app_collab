"use client";
import { FC, useEffect, useState } from "react";
import Card from "./card";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

interface Props { }

type dateType = {
  day: string;
  month: string;
  date: string
}

type dayObj = {
  day: string;
  date: string;
  month: string;
}


const Itinerary: FC<Props> = ({ }) => {
  const [itinerary, setItinerary] = useState([]);
  const [date, setDate] = useState<Array<dateType>>([{ day: " ", month: " ", date: " " }]);
  const [location, setLocation] = useState('');
  const [daysArray, setDaysArray] = useState<Array<dayObj>>([{ day:'0', date:'0', month:''}, { day:'0', date:'0', month:''}, { day:'0', date:'0', month:''}, { day:'0', date:'0', month:''}, { day:'0', date:'0', month:''}]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);
  let shortName: { [key: string]: string } = {
    January: 'Jan',	
    February:	'Feb',
    March:	'Mar',	
    April:	'Apr',	
    May:	'May',
    June:	'Jun',	
    July:	'Jul',	
    August:	'Aug',
    September:	'Sep',
    October:	'Oct',
    November:	'Nov',	
    December:	'Dec'
  }


  const formatDate = (date: number): string => {
    let value: string;
    switch (date) {
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

  const handleRightArrowClick = () => {
    if(right > date.length-1) return;
    setLeft(left+1);
    setRight(right+1);
    // setDaysArray(date.slice(left, right));
  }

  const handleLeftArrowClick = () => {
    if(left < 1) return;
    setLeft(left-1);
    setRight(right-1);
    // setDaysArray(date.slice(left, right));
  }

  const parseDate = (): void => {
    const dateString = localStorage.getItem('date');
    const dateObj = dateString && JSON.parse(dateString);

    const options: {} = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newStartDate = new Date(dateObj.startDate);
    const newEndDate = new Date(dateObj.endDate);

    const objArray = []
    while (newStartDate.getTime() != newEndDate.getTime()) {
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
    if(date.length > 5) {
      setDaysArray(date.slice(left, right));
    }
    else {
      setDaysArray(date);
    }
    console.log(daysArray)
  }, [date, left, right])

  useEffect(() => {
    const data = localStorage.getItem("ItineraryResponse");
    const locationString = localStorage.getItem("location");
    const location = locationString !== null ? JSON.parse(locationString) : null;


    setLocation(location);
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
      <div className="flex justify-between items-center">
        <h1 className="w-[478px] h-[32px] text-[43px] leading-8 font-[400] font-Nunito capitalize">{location} Sightseeing</h1>
        <div className="w-[600px] h-[76px] flex justify-center items-center p-0 m-4">
        <FiChevronLeft className="w-[40px] h-[40px] cursor-pointer" onClick={() => handleLeftArrowClick()}/>
          {daysArray.map((dayObj, index) => {
            return (
                <a href={`#day${left+(index+1)}`} className="w-[83px] h-[76px] flex flex-column items-center justify-center p-4 border-[2px] border-solid border-[#FFC857] rounded-3xl m-2 visited:bg-[#FFC857]  ">
                  <div >
                    <h1>Day {left+(index+1)}</h1>
                    <h1 className="font-bold">{shortName[dayObj.month]} <span>{parseInt(dayObj.date)}</span></h1>
                  </div>
                </a>
            )
          })}
        <FiChevronRight className="w-[40px] h-[40px] cursor-pointer" onClick={() => handleRightArrowClick()}/>
        </div>
      </div>
      {itinerary.map((line, index) => {
        return <Card line={line} ParentIndex={index} dateObj={date[index % date.length]} key={index} />;
      })}
    </div>
  );
};

export default Itinerary;
