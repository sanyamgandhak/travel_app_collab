"use client";
import { FC, useEffect, useState } from "react";
import Card from "./card";
// import axios from "axios";
import ClientOnly from "@/components/ClientOnly";
// import { HiOutlineRefresh } from "react-icons/hi";
// import { nextItinenaryPrompt } from "@/constants/prompts";
// import Loader from "@/components/Loading";

interface Props {}

type dateType = {
  day: string;
  month: string;
  date: string;
};

const Itinerary: FC<Props> = ({}) => {
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [date, setDate] = useState<Array<dateType>>([
    { day: " ", month: " ", date: " " },
  ]);

  // const [nextResponseInput, setNextResponseInput] = useState("");
  // const [nextResponse, setNextResponse] = useState("");
  // const [loading, setLoading] = useState(false);

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
  };

  // const prompt = nextItinenaryPrompt(nextResponseInput);

  // const nextResponseSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post("/api/create-itinerary-api", {
  //       prompt,
  //     });
  //     setNextResponse(response.data);
  //     setLoading(false);
  //   } catch (error: any) {
  //     setLoading(false);
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const parseDate = (): void => {
      const dateString = localStorage.getItem("date");
      const dateObj = dateString && JSON.parse(dateString);

      const options: {} = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const newStartDate = new Date(dateObj.startDate);
      const newEndDate = new Date(dateObj.endDate);

      const objArray = [];
      while (newStartDate.getTime() != newEndDate.getTime()) {
        const dateString = newStartDate.toLocaleDateString(undefined, options);
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
      setDate(objArray);
    };

    const data = localStorage.getItem("ItineraryResponse");
    localStorage.removeItem("imageMapUrl");
    parseDate();
    if (!data) return;
    // else if (nextResponse) {
    // localStorage.setItem("ItineraryResponse", JSON.stringify(nextResponse));
    //   const itineraryArray = nextResponse.split(/Day \d+:/);
    //   itineraryArray.shift();
    //   setItinerary(itineraryArray);
    // }
    else {
      const parsedData = JSON.parse(data);
      // setNextResponseInput(parsedData);
      const itineraryArray = parsedData.split(/Day \d+:/);
      itineraryArray.shift();
      setItinerary(itineraryArray);
    }
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <ClientOnly>
      {/* <ClientOnly>
        <div className="relative">
          <button
            type="submit"
            className="absolute right-24 top-16 flex gap-2 items-center outline-1 bg-[#FFC857] px-2 py-1 rounded-full"
            style={{ border: "2px solid #FFC857" }}
            onClick={nextResponseSubmit}
          >
            <HiOutlineRefresh size={30} className="cursor-pointer" />
            <h1>Refresh</h1>
          </button>
        </div>
      </ClientOnly> */}

      <div className="mt-20 mx-[88px] pb-10 scrollbar">
        {itinerary.map((line, index) => {
          return (
            <Card
              line={line}
              ParentIndex={index}
              dateObj={date[index % date.length]}
              key={index}
            />
          );
        })}
      </div>
    </ClientOnly>
  );
};

export default Itinerary;
