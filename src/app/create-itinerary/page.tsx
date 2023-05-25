"use client";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import ClientOnly from "../components/ClientOnly";
import moment from "moment";

interface Props {}

const CreateItinerary: FC<Props> = ({}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const inputStartDate = moment(startDate);
  const formattedStartDate = inputStartDate.format("MMMM Do YYYY");

  const inputEndDate = moment(endDate);
  const formattedEndDate = inputEndDate.format("MMMM Do YYYY");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formattedStartDate, formattedEndDate);
  };
  return (
    <ClientOnly>
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col items-center justify-center h-full w-full"
        style={{ gap: "88px" }}
      >
        <div className="w-[485px] h-[40px] ">
          <h1 className="text-[#3F3D56] text-5xl">Create your ideal trip</h1>
        </div>
        <div className="flex flex-col gap-[40px]">
          <input
            type="text"
            className="w-[624px] h-[48px] rounded-xl px-5 border-2 border-solid border-black"
            placeholder="Location"
          />

          <div className="flex items-center w-[624px] h-[48px] rounded-xl px-5 border-2 border-solid border-black">
            <input
              type="text"
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
              placeholder="Start Date"
              pattern="\d{2}-\d{2}-\d{4}"
              className="w-1/2 px-4 py-2 border-none focus:outline-none"
              title="Please enter a date in the format dd-mm-yyyy"
            />
            <div className="h-full w-[2px] bg-black mx-2"></div>
            <input
              type="text"
              name="endDate"
              value={endDate}
              onChange={handleInputChange}
              placeholder="End Date"
              pattern="\d{2}-\d{2}-\d{4}"
              className="w-1/2 px-4 py-2 border-none focus:outline-none"
              title="Please enter a date in the format dd-mm-yyyy"
            />
          </div>
        </div>
        <button className="bg-[#ffc857] rounded-xl h-12 w-60 font-bold text-xl">
          CREATE ITINERARY
        </button>
      </form>
    </ClientOnly>
  );
};

export default CreateItinerary;
