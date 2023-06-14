"use client";
import { FC } from "react";
import ClientOnly from "@/components/ClientOnly";
import { useRouter } from "next/navigation";

const Options: FC = () => {
  const { push } = useRouter();
  return (
    <ClientOnly>
      <section className="flex flex-col items-center justify-center h-full w-full gap-[50px]">
        <div className="h-[40px] ">
          <h1 className="text-[#3F3D56] text-5xl">
            What would you like to do?
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="w-[391px] h-[308px] bg-[#F2F2F2] rounded-3xl flex flex-col items-center gap-4 pt-7">
            <h1>
              <span className="text-[30px]">Trip Planner</span>
              <sup className="text-[20px]">AI</sup>
            </h1>
            <div className="text-left text-[21px] px-[20px]">
              <li>Destination has been selected</li>
              <li>Detailed day-to-day itinerary</li>
              <li>
                Suggested activities with popular{" "}
                <span className="px-7">attraction</span>
              </li>
            </div>
            <button
              className="w-[191px] h-[42px] bg-[#FFC857] rounded-3xl font-bold"
              onClick={() => push("create-itinerary")}
            >
              CREATE ITINERARY
            </button>
          </div>
          <div className="w-[391px] h-[308px] bg-[#F2F2F2] rounded-3xl flex flex-col items-center gap-4 pt-7">
            <h1>
              <span className="text-[30px]">Explore Destinations</span>
            </h1>
            <div className="text-left text-[21px] px-[20px]">
              <li>Find your next trip destination</li>
              <li>Brief overview of the schedule</li>
              <li>
                Suggested activities with popular{" "}
                <span className="px-7">attraction</span>
              </li>
            </div>
            <button
              className="w-[234px] h-[42px] bg-[#FFC857] rounded-3xl font-bold"
              onClick={() => push("explore-destinations")}
            >
              SUGGEST DESTINATIONS
            </button>
          </div>
        </div>
      </section>
    </ClientOnly>
  );
};

export default Options;
