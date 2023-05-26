"use client";
import { FC, useState, FormEvent } from "react";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientOnly from "../components/ClientOnly";
import axios from "axios";
import { itinenaryPrompt } from "../constants/prompts";

interface Props {}

const CreateItinerary: FC<Props> = ({}) => {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleStartDateChange = (date: Date) => {
    if (endDate && date > endDate) {
      toast.error("Start date cannot be after the end date");
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate && date < startDate) {
      toast.error("End date cannot be before the start date");
    } else {
      setEndDate(date);
    }
  };
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!endDate || !startDate || !location) {
      toast.error("Please fill in all the inputs");
      return;
    }

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    const dateRange = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    const prompt = itinenaryPrompt(dateRange, location);

    try {
      const response = await axios.post("/api/openai", {
        prompt,
      });
      console.log(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <ClientOnly>
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col items-center justify-center h-full w-full gap-[88px]"
      >
        <div className="w-[485px] h-[40px] ">
          <h1 className="text-[#3F3D56] text-5xl">Create your ideal trip</h1>
        </div>
        <div className="flex flex-col gap-[40px]">
          <input
            type="text"
            className="w-[624px] h-[48px] rounded-xl px-5 border-2 border-solid border-black"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />

          <div className="flex items-center w-[624px] h-[48px] rounded-xl px-5 border-2 border-solid border-black">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="Start Date"
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
            <div className="h-full w-[2px] bg-black mx-2"></div>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="End Date"
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <button
          className="bg-[#ffc857] rounded-xl h-12 w-60 font-bold text-xl cursor-pointer"
          disabled={endDate! < startDate! || startDate! > endDate!}
        >
          CREATE ITINERARY
        </button>
      </form>
    </ClientOnly>
  );
};

export default CreateItinerary;
