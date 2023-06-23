"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { ItineraryDocumentData } from "@/libs/types/typings";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useAuthStore from "@/hooks/Auth";
import { db } from "@/libs/firebase";
import Card from "./savedCard";
import formatDate from "./utils/formatDate";

type dateType = {
  day: string;
  month: string;
  date: string;
};

type dayObj = {
  day: string;
  date: string;
  month: string;
  isActive?: boolean;
};

const IndividualSavedItinerary: FC = () => {
  const pathname = usePathname();
  const { currentUser } = useAuthStore();
  const itinenaryId = pathname.split("/")[2];
  const [itinerary, setItinerary] = useState<ItineraryDocumentData[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [date, setDate] = useState<Array<dateType>>([
    { day: " ", month: " ", date: " " },
  ]);
  const [daysArray, setDaysArray] = useState<Array<dayObj>>([
    { day: "0", date: "0", month: "", isActive: false },
    { day: "0", date: "0", month: "", isActive: false },
    { day: "0", date: "0", month: "", isActive: false },
    { day: "0", date: "0", month: "", isActive: false },
    { day: "0", date: "0", month: "", isActive: false },
  ]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);

  const handleRightArrowClick = () => {
    if (right > date.length - 1) return;
    setLeft(left + 1);
    setRight(right + 1);
  };

  const handleLeftArrowClick = () => {
    if (left < 1) return;
    setLeft(left - 1);
    setRight(right - 1);
  };

  const handleDayClick = (index: number) => {
    const updateDay = daysArray.map((day) => ({ ...day, isActive: false }));
    updateDay[index - left] = { ...daysArray[index - left], isActive: true };
    setDaysArray(updateDay);
  };

  useEffect(() => {
    if (date.length > 5) {
      setDaysArray(date.slice(left, right));
    } else {
      setDaysArray(date);
    }
  }, [date, left, right]);

  useEffect(() => {
    const fetchItinenary = async (uid: string) => {
      if (!currentUser) return;
      try {
        const itineraryRef = doc(
          db,
          "users",
          currentUser?.uid,
          "itinerary",
          uid
        );
        const documentSnapshot = await getDoc(itineraryRef);
        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data() as ItineraryDocumentData;
          setStartDate(new Date(documentData?.startDate));
          setEndDate(new Date(documentData?.endDate));
          const itinenaryArray = [];
          itinenaryArray.push(documentData);
          setItinerary(itinenaryArray);
        } else {
          console.log("Itinerary does not exist");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchItinenary(itinenaryId);
  }, [currentUser, itinenaryId]);

  useEffect(() => {
    const parseDate = (): void => {
      const options: {} = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const newStartDate: Date | undefined = startDate;
      const newEndDate: Date | undefined = endDate;

      const objArray = [];
      if (newStartDate && newEndDate) {
        while (newStartDate.getTime() != newEndDate.getTime()) {
          const dateString = newStartDate.toLocaleDateString(
            undefined,
            options
          );
          const dateArray = dateString.split(/[,\s]+/);
          const formatedDate = formatDate(parseInt(dateArray[2]));
          const obj = {
            day: dateArray[0],
            month: dateArray[1],
            date: formatedDate,
          };
          objArray.push(obj);
          newStartDate.setDate(newStartDate.getDate() + 1);
        }
      }
      setDate(objArray);
    };
    parseDate();
  }, [startDate, endDate]);

  useEffect(() => {
    localStorage.setItem("currentPathname", JSON.stringify(pathname));
  }, [pathname]);

  return (
    <main>
      <div>
        <div
          className={`flex w-[100%] h-[98px] justify-between items-center sticky top-0 left-0 bg-white px-[44px] py-[24px] shadow-[0px_8px_16px_rgba(0,0,0,.15)]`}
          style={{ zIndex: 1 }}
        >
          <div className="w-[789px] h-[76px] flex justify-start items-center p-0 m-4 ">
            <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
              <FiChevronLeft
                className="w-[40px] h-[25px]"
                onClick={() => handleLeftArrowClick()}
              />
            </div>
            {daysArray.map((dayObj, index) => {
              return (
                <a
                  key={index}
                  href={`#day${left + (index + 1)}`}
                  className={`w-[83px] h-[46px] flex flex-column items-center justify-center p-4 border-[2px] border-solid border-[#FFC857] rounded-3xl m-2 visited:bg-[#FFC857] ${
                    daysArray[index].isActive ? "bg-[#FFC857]" : ""
                  }`}
                  onClick={() => handleDayClick(left + index)}
                >
                  <div style={{ pointerEvents: "none" }}>
                    <h1>DAY {left + (index + 1)}</h1>
                  </div>
                </a>
              );
            })}
            <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
              <FiChevronRight
                className="w-[40px] h-[25px]"
                onClick={() => handleRightArrowClick()}
              />
            </div>
          </div>
        </div>
        {itinerary.length &&
          itinerary[0].itinerary.map((item, index) => {
            return (
              <div className=" mx-[88px] pb-10 scrollbar" key={index}>
                <Card
                  line={item}
                  dateObj={date[index % date.length]}
                  ParentIndex={index}
                  itinerary={itinerary}
                />
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default IndividualSavedItinerary;
