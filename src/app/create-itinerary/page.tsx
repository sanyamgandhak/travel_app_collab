"use client";
import React, { FC, useState, FormEvent, useEffect } from "react";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import StylesConfig from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ClientOnly from "../../components/ClientOnly";
import { itinenaryPrompt } from "../../constants/prompts";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loading";
import { axiosInstance } from "@/libs/config";
import { RxCross2 } from "react-icons/rx";

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
  <button
    type="button"
    className={`${
      isActive && "bg-[#FFC857]"
    } w-[50%] rounded-full text-center h-full flex items-center justify-center cursor-pointer`}
    onClick={onClick}
  >
    <h1 className="text-xl font-medium">{trip}</h1>
  </button>
);

const styles: {} = {
  menu: (provided: {}) => ({
    ...provided,
    width: "450px",
    borderBottom: "1px dotted pink",
    padding: 10,
    backgroundColor: "white",
  }),

  control: () => ({
    alignItems: "center",
    boxShadow: undefined,
    boxSizing: "border-box",
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    label: "control",
    minHeight: 38,
    outline: "0 !important",
    position: "relative",
    transition: "all 100ms",
  }),

  input: (provided: {}) => ({
    ...provided,
    width: "50px",
  }),

  singleValue: (provided: {}) => {
    const display = "none";
    return { ...provided, display };
  },
};

const CreateItinerary: FC<Props> = ({}) => {
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxEndDate, setMaxEndDate] = useState<Date | null>(null);
  const [input, setInput] = useState<Array<string>>([]);
  const [tripType, setTripType] = useState<{
    busy: boolean;
    relaxed: boolean;
  }>({
    busy: true,
    relaxed: false,
  });

  for (const places of input) {
    const placesArray = places.split(",");
    const placename = placesArray[0];
    const countryName = placesArray[placesArray.length - 1];
    console.log(`placename: ${placename}, countryName: ${countryName}`);
  }

  const [tripDetails, setTripDetails] = useState<{
    cultural: boolean;
    balanced: boolean;
    adventure: boolean;
    sightsee: boolean;
  }>({
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

  const formatDate = (startDate: Date, endDate: Date) => {
    const dateObj = {
      startDate: startDate,
      endDate: endDate,
    };
    localStorage.setItem("date", JSON.stringify(dateObj));
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("location", JSON.stringify(location));
    if (!endDate || !startDate || !location) {
      toast.error("Please fill in all the inputs");
      return;
    }

    formatDate(startDate, endDate);
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
      const response = await axiosInstance.post("/api/create-itinerary-api", {
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
    setTripType((prevState) => ({
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

  const handleOnChange = (value: { description: string }) => {
    if (input.indexOf(value.description) === -1) {
      setInput((prevInput) => [...prevInput, value.description]);
    }
  };

  const handleOnclick = (e: React.SyntheticEvent, value: string) => {
    e.preventDefault();
    const newInput = input.filter((words) => {
      return words !== value;
    });
    setInput(newInput);
  };

  return (
    <ClientOnly>
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col items-center justify-center h-full w-full gap-[88px]"
      >
        <div className="w-[485px] h-[40px] ">
          <h1 className="relative z-[-1] text-[#000000DE] text-5xl font-[300] font-Nunito tracking-[-0.5px]">
            Create your ideal trip
          </h1>
        </div>
        <div className="flex flex-col gap-[40px]">
          {/* <input
            type="text"
            className="w-[624px] h-[48px] rounded-3xl px-5 border-[2px] border-solid border-black bg-[#F2F2F2]"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          /> */}

          <div className="bg-[#F2F2F2] w-[624px] border-2 border-solid border-black rounded-3xl py-[5px] px-[24px] flex items-center flex-wrap">
            {input.map((each, index) => {
              return (
                <li
                  key={index}
                  className="list-none m-[2px] p-[5px] flex items-center bg-[white] rounded-[5px]"
                >
                  {each}
                  <RxCross2
                    className="border-1 border-solid border-black mx-[2px] cursor-pointer"
                    onClick={(e) => handleOnclick(e, each)}
                  />
                </li>
              );
            })}
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}
              selectProps={{
                placeholder: "search places",
                onChange: (e) => handleOnChange(e?.value),
                styles: styles,
                // isLoading: false,
                className: "flex-1",
              }}
            />
          </div>

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
