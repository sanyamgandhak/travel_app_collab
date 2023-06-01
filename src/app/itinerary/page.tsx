"use client";
import { FC, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import ClientOnly from "../../components/ClientOnly";
import Images from "@/components/images";


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
  
  return (
    <ClientOnly>
      <div className="mt-20 mx-[88px] pb-10 scrollbar">
        {itinerary.split("\n").map((line, index) => {
          if (line.startsWith("Day")) {
            return (
              <div key={index} className="mt-9">
                <h2 className="text-[#003300] text-[28px]">{line}</h2>
              </div>
            );
          } else if (line.startsWith("Overview:")) {
            return (
              <div key={index} className="mt-7">
                <h2 className="text-[#003300] text-[16px]">{line}</h2>
              </div>
            );
          } else if (
            line.startsWith("1.") ||
            line.startsWith("2.") ||
            line.startsWith("3.")
          ) {
            let time;

            if (line.includes("[Must-see!]")) {
              const time_MustSee = line
                ?.split(": ")[1]
                ?.split(" [")[0]
                ?.split(" (")[1]
                ?.split(" ")[0];
              time = time_MustSee;
            } else {
              const time_MustNotSee = line
                ?.split(": ")[1]
                ?.split(" (")[1]
                ?.split(" ")[0];
              time = time_MustNotSee;
            }
         

            const descriptionRegex =
              /:\s*(.*?)\s*(?:\(\d+-\d+\s*hours\))?(?:\s*\[Must-see!\])?$/;
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
                    <h1 className="text-[20px] text-gray-600/40">
                      spend {time} hours
                    </h1>
                    <h1 className="text-[20px] overflow-y-scroll scrollbar mt-3">
                      {description.split(". ")[0]}
                    </h1>
                  </div>
                  <div className="w-[30%] text-center">
                  <Images locationName ={line.split(": ")[0].split(". ")[1]} />
                  </div>
                </div>

                <div className="text-gray-600/50 mx-8 mt-3 text-[20px]">
                  2.6 miles to next stop
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
