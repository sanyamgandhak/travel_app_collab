"use client";
import { FC, useEffect, useState } from "react";
import Card from "./card";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import formatDate from "./utils/format";

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
  isActive?: boolean;
}


const Itinerary: FC<Props> = ({ }) => {
  const [color, setColor] = useState<string>('#ffffff');
  const [itinerary, setItinerary] = useState([]);
  const [date, setDate] = useState<Array<dateType>>([{ day: " ", month: " ", date: " " }]);
  const [location, setLocation] = useState('');
  const [daysArray, setDaysArray] = useState<Array<dayObj>>([{ day:'0', date:'0', month:'', isActive: false}, { day:'0', date:'0', month:'', isActive: false}, { day:'0', date:'0', month:'', isActive: false}, { day:'0', date:'0', month:'', isActive: false}, { day:'0', date:'0', month:'', isActive: false}]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(7);
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


  const handleRightArrowClick = () => {
    if(right > date.length-1) return;
    setLeft(left+1);
    setRight(right+1);
  }

  const handleLeftArrowClick = () => {
    if(left < 1) return;
    setLeft(left-1);
    setRight(right-1);
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
    if(date.length > 7) {
      setDaysArray(date.slice(left, right));
    }
    else {
      setDaysArray(date);
    }
  }, [date, left, right])


  const listenScrollEvent = () => {
    if(window.scrollY > 64) {
      setColor('#44BBA4');
    }else {
      setColor('#ffffff');
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
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

  const handleDayClick = (index: number) => {
    const updateDay = daysArray.map((day) => ({...day, isActive: false}));
    updateDay[index-left] = {...daysArray[index-left], isActive: true};
    setDaysArray(updateDay);
  }

  return (
    <div>
      <div className={`flex w-[100%] h-[128px] justify-between items-center sticky top-0 left-0 bg-[${color}] px-[44px] py-[24px] shadow-[0px_8px_16px_rgba(0,0,0,.15)]`} style={{zIndex: 1}} >
        <div className="w-[789px] h-[76px] flex justify-center items-center p-0 m-4 ">
          <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
            <FiChevronLeft className="w-[40px] h-[25px]" onClick={() => handleLeftArrowClick()}/>
          </div>
          {daysArray.map((dayObj, index) => {
            return (
                <a href={`#day${left+(index+1)}`} className={`w-[83px] h-[76px] flex flex-column items-center justify-center p-4 border-[2px] border-solid border-[#FFC857] rounded-3xl m-2 visited:bg-[#FFC857] ${daysArray[index].isActive ? "bg-[#FFC857]" : ''}`} onClick={() => handleDayClick(left+index)}
                >
                  <div style={{ pointerEvents: 'none' }}>
                    <h1>Day {left+(index+1)}</h1>
                    <h1 className="font-bold">{shortName[dayObj.month]} <span>{parseInt(dayObj.date)}</span></h1>
                  </div>
                </a>
            )
          })}
          <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
            <FiChevronRight className="w-[40px] h-[25px]"  onClick={() => handleRightArrowClick()}/>
          </div>
        </div>
      </div>

      <div className=" mx-[88px] pb-10 scrollbar">
      {itinerary.map((line, index) => {
        return <Card line={line} ParentIndex={index} dateObj={date[index % date.length]} key={index} />;
      })}
    </div>
    </div>
  );
};

export default Itinerary;
