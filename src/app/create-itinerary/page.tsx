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

const TripType = ({
  trip,
  isActive,
  onClick,
}: {
  trip: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    className={`${
      isActive && "bg-[#FFC857]"
    } w-[50%] rounded-full text-center h-full flex items-center justify-center cursor-pointer`}
    onClick={onClick}
  >
    <h1 className="text-xl font-medium">{trip}</h1>
  </div>
);

const CreateItinerary: FC<Props> = ({}) => {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxEndDate, setMaxEndDate] = useState<Date | null>(null);
  const [tripType, setTrripType] = useState({
    busy: true,
    relaxed: false,
  });

  const [tripDetails, setTripDetails] = useState({
    cultural: true,
    balanced: false,
    adventure: false,
    sightsee: false,
  });
  const [tripTypeInput, setTripTypeInput] = useState<"Busy" | "Relaxed">(
    "Busy"
  );
  const [tripDetailsInput, setTripDetailsInput] = useState<
    "Cultural" | "Balanced" | "Adventure" | "Sightsee"
  >("Cultural");


  const router = useRouter();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const handleStartDateChange = (date: Date) => {
    if (endDate && date > endDate) {
      toast.error("Start date cannot be after the end date");
    } else if (date < currentDate) {
      toast.error("Start date cannot be before the current date");
    } else {
      const maxDate = new Date(date.getTime() + 21 * 24 * 60 * 60 * 1000);
      setStartDate(date);
      setMaxEndDate(maxDate);
      setEndDate(null); // Reset end date when start date changes
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

    const prompt = itinenaryPrompt(
      dateRange,
      location,
      tripTypeInput,
      tripDetailsInput
    );


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
  const handleTripType = (type: string, text: "Busy" | "Relaxed") => {
    setTrripType((prevState) => ({
      ...prevState,
      busy: type === "busy",
      relaxed: type === "relaxed",
    }));

    setTripTypeInput(text);
  };

  const handleTripDetails = (
    type: string,
    text: "Cultural" | "Balanced" | "Adventure" | "Sightsee"
  ) => {
    setTripDetails((prevState) => ({
      ...prevState,
      cultural: type === "cultural",
      balanced: type === "balanced",
      adventure: type === "adventure",
      sightsee: type === "sightsee",
    }));

    setTripDetailsInput(text);
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
              maxDate={maxEndDate}
            />
            <div className="h-full w-[2px] bg-black mx-2"></div>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="End Date"
              className="w-full px-4 py-2 border-none focus:outline-none bg-[#F2F2F2]"
              minDate={currentDate}
              maxDate={maxEndDate}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex h-[48px] bg-[#F2F2F2] w-[200px] rounded-full justify-center items-center">
              <TripType
                trip="Busy"
                isActive={tripType.busy}
                onClick={() => handleTripType("busy", "Busy")}
              />
              <TripType
                trip="Relaxed"
                isActive={tripType.relaxed}
                onClick={() => handleTripType("relaxed", "Relaxed")}
              />
            </div>
            <div className="flex h-[48px] bg-[#F2F2F2] w-[422px] rounded-full justify-center items-center">
              <TripType
                trip="Cultural"
                isActive={tripDetails.cultural}
                onClick={() => handleTripDetails("cultural", "Cultural")}
              />
              <TripType
                trip="Balanced"
                isActive={tripDetails.balanced}
                onClick={() => handleTripDetails("balanced", "Balanced")}
              />
              <TripType
                trip="Adventure"
                isActive={tripDetails.adventure}
                onClick={() => handleTripDetails("adventure", "Adventure")}
              />
              <TripType
                trip="Sightsee"
                isActive={tripDetails.sightsee}
                onClick={() => handleTripDetails("sightsee", "Sightsee")}
              />
            </div>
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
