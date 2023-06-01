"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientOnly from "../../components/ClientOnly";
import axios from "axios";
import { itinenaryPrompt } from "../../constants/prompts";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loading";



interface Props {}

const CreateItinerary: FC<Props> = ({}) => {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const handleStartDateChange = (date: Date) => {
    if (endDate && date > endDate) {
      toast.error("Start date cannot be after the end date");
    } else if (date < currentDate) {
      toast.error("Start date cannot be before the current date");
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate && date <= startDate) {
      toast.error("End date cannot be before or same as the start date");
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
      setLoading(true);
      const response = await axios.post("/api/openai", {
        prompt,
      });
      setResponse(response.data);
      setLoading(false);
      router.push("itinerary");
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("ItineraryResponse", JSON.stringify(response));
  }, [response]);

  if (loading) {
    return <Loader />;
  }

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
            className="w-[624px] h-[48px] rounded-3xl px-5 border-[2px] border-solid border-black bg-[#F2F2F2]"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />

          <div className="flex items-center w-[624px] h-[48px] rounded-3xl px-5 border-[2px] border-solid border-black bg-[#F2F2F2]">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="Start Date"
              className="w-full px-4 py-2 border-none focus:outline-none bg-[#F2F2F2]"
              minDate={currentDate}
            />
            <div className="h-full w-[2px] bg-black mx-2"></div>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="End Date"
              className="w-full px-4 py-2 border-none focus:outline-none bg-[#F2F2F2]"
              minDate={currentDate}
            />
          </div>
        </div>
        <button
          className="bg-[#ffc857] rounded-3xl h-12 w-60 font-bold text-xl cursor-pointer"
          disabled={endDate! < startDate! || startDate! > endDate!}
        >
          CREATE ITINERARY
        </button>
      </form>
    </ClientOnly>
  );
};

export default CreateItinerary;
