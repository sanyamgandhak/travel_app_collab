"use client";
import { FC, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import ClientOnly from "@/components/ClientOnly";
import { AiOutlineDown } from "react-icons/ai";
import Images from "@/components/UnsplashImage";
import { FaHome } from "react-icons/fa";

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
      <div className="mt-20 mx-[88px] pb-10 scrollbar">
        {itinerary.split("\n").map((line, index) => {
          if (line.startsWith("Day")) {
            return (
              <div key={index} className="mt-9 flex gap-2 items-center">
                <AiOutlineDown className="cursor-pointer" />
                <h2 className="text-[#003300] text-[28px]">{line}</h2>
              </div>
            );
          } else if (line.startsWith("Overview:")) {
            return (
              <div key={index} className="mt-7">
                <h2 className="text-[#003300] text-[20px]">{line}</h2>
              </div>
            );
          } else if (
            line.startsWith("1.") ||
            line.startsWith("2.") ||
            line.startsWith("3.")
          ) {
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

                if (line.includes("minutes")) {
                  displayTime = `${startTime}-${endTime} minutes`;
                } else {
                  displayTime = `${startTime}-${endTime} hours`;
                }
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
                <div className="flex gap-5 w-full ">
                  <div className="h-[272px] w-[80%] bg-[#F2F2F2] px-6 rounded-xl flex flex-col gap-3 p-8">
                    <div className="flex justify-between">
                      <h1 className="text-[20px]">{line.split(": ")[0]}</h1>
                      <IoLocationSharp
                        color="black"
                        className="h-10 w-10 cursor-pointer"
                        title="Click to view the map"
                      />
                    </div>
                    {displayTime && (
                      <h1 className="text-[20px] text-gray-600/40">
                        spend {displayTime}
                      </h1>
                    )}
                    <h1 className="text-[20px] overflow-y-scroll scrollbar mt-3">
                      {description.split(". (")[0]}
                    </h1>
                  </div>
                  <div className="w-[30%] text-center">
                    <Images locationName={line.split(": ")[0].split(". ")[1]} />
                  </div>
                </div>

                <div className="text-gray-600/50 mx-8 mt-3 text-[20px]">
                  2.6 miles to next stop
                </div>
              </div>
            );
          }
          if (line.startsWith("City/Area to stay at:")) {
            const areaToStay = line.split(":")[1].trim();
            const suggestedHotel = itinerary
              .split("\n")
              [index + 1].split(":")[1]
              .trim();

            return (
              <div
                key={index}
                className="h-[102px] w-[40%] bg-[#F2F2F2] px-6 rounded-xl flex gap-3 items-center mt-3"
              >
                <div>
                  <FaHome size={45} />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="font-medium text-lg">
                    Area to stay at: {areaToStay}
                  </h1>
                  <h1 className="font-medium text-lg">
                    Suggested hotels: {suggestedHotel}
                  </h1>
                </div>
              </div>
            );
          }
        })}
      </div>
    </ClientOnly>
  );
};

export default Itinerary;
