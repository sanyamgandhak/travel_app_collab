"use client";
import { FC, useRef } from "react";
import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Images from "@/components/UnsplashImage";
import ClientOnly from "@/components/ClientOnly";
import handleMapClick from "./utils/handle_map_click";

type Props = {
  line: string;
  ParentIndex: number;
  dateObj: {
    day: string;
    month: string;
    date: string;
  }
};



const Card: FC<Props> = ({ line, dateObj, ParentIndex }) => {
  const [show, setShow] = useState(true);
  

  const handleClick = () => {
    setShow(!show);
  };

  const renderHotelAndArea = () => {
    const areaToStayRegex: RegExp = /City\/Area to stay at:\s*(.*)/;
    const areaToStayMatch = line.match(areaToStayRegex);
    const areaToStay = areaToStayMatch ? areaToStayMatch[1].trim() : null;

    const suggestedHotelRegex: RegExp = /Suggested Hotel:\s*(.*)/;
    const suggestedHotelMatch = line.match(suggestedHotelRegex);
    const suggestedHotel = suggestedHotelMatch
      ? suggestedHotelMatch[1].trim()
      : null;

    if (areaToStay && suggestedHotel) {
      return (
        <div className="h-[102px] w-[40%] bg-[#F2F2F2] px-6 rounded-xl flex gap-3 items-center mt-3">
          <div>
            <FaHome size={45} />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-medium text-lg">
              Area to stay at: {areaToStay}
            </h1>
            <h1 className="font-medium text-lg">
              Suggested Hotel: {suggestedHotel}
            </h1>
          </div>
        </div>
      );
    }

    return null;
  };


  return (
    <ClientOnly>
      {line.split("\n").map((line, index) => {
        if (index === 0) {
          return (
            <div key={index} className="mt-9 flex justify-start items-center">
              {show ? (
                <FiChevronDown
                onClick={handleClick}
                color="black"
                className="h-8 w-10 cursor-pointer"
                title="Click to view the map"
                />
                ) : (
                  <FiChevronUp
                  onClick={handleClick}
                  color="black"
                  className="h-8 w-10 cursor-pointer"
                  title="Click to view the map"
                  />
                  )}
              <h2 className="text-[#003300] text-[28px]">{`Day ${
                ParentIndex + 1
              }: ${dateObj.day}, ${dateObj.month} ${dateObj.date} `}</h2>
            </div>
          );
          
        } else if (line.startsWith("Overview:")) {
          return (
            <div key={index} className="mt-7">
              <h2 className="text-[#003300] text-[18px]">{line}</h2>
            </div>
          );
        } else if (
          line.startsWith("1.") ||
          line.startsWith("2.") ||
          line.startsWith("3.")
        ) {
          let mustSee;

          if (line.includes("[Must-see!]")) {
            mustSee = true;
          } else {
            mustSee = false;
          }
          const timeRegex: RegExp =
            /\((\d+(?:-\d+)?)(?:\s*(?:hour|minute)s?)\)/;
          const timeMatch = line.match(timeRegex);
          let time = "";

          if (timeMatch && timeMatch[1]) {
            time = timeMatch[1];
          }

          let displayTime = "";

          if (time) {
            if (time.includes("-")) {
              const [start, end] = time.split("-");
              const startTime = parseInt(start);
              const endTime = parseInt(end);

              displayTime = line.includes("minutes")
                ? `${startTime}-${endTime} minutes`
                : `${startTime}-${endTime} hours`;
            } else {
              displayTime = line.includes("minutes")
                ? `${time} minutes`
                : `${time} hours`;
            }
          }

          const descriptionRegex: RegExp =
            /:\s*(.*)\s*(?:\(\d+-\d+\s*hours\))?(?:\s*\[Must-see!\])?/;
          const descriptionMatch = line.match(descriptionRegex);
          let description;

          if (descriptionMatch && descriptionMatch[1]) {
            description = descriptionMatch[1].trim();
          } else {
            const descriptionSplit = line.split(":");
            if (descriptionSplit.length > 1) {
              description = descriptionSplit[1].trim();
            } else {
              description = "";
            }
          }

          return (
            <div key={index} className="mt-8">
              {!show ? (
                <div className="flex justify-between w-[1264] h-[140px] bg-[#F2F2F2] rounded-3xl px-6 py-8">
                  <div>
                    <h1 className="text-[20px]">{line.split(": ")[0]}</h1>
                    {displayTime && (
                      <h1 className="text-[20px] text-gray-600/40">
                        spend {displayTime}
                      </h1>
                    )}
                  </div>
                  <IoLocationSharp
                    color="black"
                    className="h-10 w-10 cursor-pointer"
                    title="Click to view the map"
                    onClick={() => handleMapClick(line.split(": ")[0].split(/\.(.+)/)[1])}
                  />
                </div>
              ) : (
                <div className="flex gap-5 w-full relative">
                  <div className="h-[272px] w-[80%] bg-[#F2F2F2] px-6 rounded-xl flex flex-col gap-3 p-8">
                    <div className="flex justify-between">
                      <h1 className="text-[20px]">{line.split(": ")[0]}</h1>
                      <IoLocationSharp
                        color="black"
                        className="h-10 w-10 cursor-pointer"
                        title="Click to view the map"
                        onClick={() => handleMapClick(line.split(": ")[0].split(/\.(.+)/)[1])}
                      />
                    </div>
                    {mustSee && (
                      <div className="absolute bottom-[244px] -left-4">
                        <AiFillStar
                          color="#FFC857"
                          size={50}
                          className=" transform rotate-12"
                        />
                      </div>
                    )}
                    {displayTime && (
                      <h1 className="text-[20px] text-gray-600/40">
                        spend {displayTime}
                      </h1>
                    )}
                    <h1 className="text-[18px] overflow-y-scroll scrollbar mt-3">
                      {description.split(". (")[0].replace(/\[Must See]/g, "").replace(/\\Must See!/g, "")}
                    </h1>
                  </div>
                  <div className="w-[30%] text-center">
                    <Images locationName={line.split(": ")[0].split(/\.(.+)/)[1]} />
                  </div>
                </div>
              )}

              <div className="text-gray-600/50 mx-8 mt-3 text-[20px]">
                2.6 miles to next stop
              </div>
            </div>
          );
        }
      })}

      {show && renderHotelAndArea()}
    </ClientOnly>
  );
};

export default Card;
