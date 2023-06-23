"use client";
import Image from "next/image";
import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/assets/Modal-Image.png";
import useAuthStore from "@/hooks/Auth";
import { db } from "@/libs/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";

interface Props {
  isOpen: boolean;
  handleModal: () => void;
  line: string[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  flag: boolean;
}

const SavedTripsModal: FC<Props> = ({
  handleModal,
  isOpen,
  line,
  setIsOpen,
  flag,
}) => {
  const [savedTripsImageUrl, setSavedTripsImageUrl] = useState("");
  const [itineraryName, setItineraryName] = useState("");
  const [startDate, setstartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      const imageUrlString = localStorage.getItem("imageUrl");
      const imageUrl = imageUrlString && JSON.parse(imageUrlString);
      const savedTripsImage = imageUrl && Object.values(imageUrl)[0];
      console.log(imageUrl);
      setSavedTripsImageUrl(savedTripsImage);
    }
  }, [isOpen, flag]);

  useEffect(() => {
    const dateRangeString = localStorage.getItem("date");
    const dateRange = dateRangeString && JSON.parse(dateRangeString);
    setstartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
  }, []);

  const savedItineraryToDb = async () => {
    if (savedTripsImageUrl && line && currentUser) {
      try {
        const uid = uuidv4();

        const itineraryRef = doc(
          db,
          "users",
          currentUser?.uid,
          "itinerary",
          uid
        );

        const imageUrlObjString = localStorage.getItem("imageUrl");
        const imageUrl = imageUrlObjString && JSON.parse(imageUrlObjString);

        const imageMapString = localStorage.getItem("imageMapUrl");
        const imageMapUrl = imageMapString && JSON.parse(imageMapString);

        const distanceString = localStorage.getItem("distance");
        const distance = distanceString && JSON.parse(distanceString);

        const itineraryData = {
          title: itineraryName,
          itinerary: line,
          googleImageSavedTripsUrl: savedTripsImageUrl,
          timestamp: Timestamp.now(),
          uid,
          startDate,
          endDate,
          imageUrl,
          imageMapUrl,
          distance,
        };

        await setDoc(itineraryRef, itineraryData);

        setItineraryName("");
        toast.success("Itinerary saved to database");
        setIsOpen(!isOpen);
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      toast.error("Something went wrong!!");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-400/50">
          <div className="bg-white p-8 rounded shadow-lg h-[540px] w-[540px] flex flex-col items-center gap-7 relative pt-[50px]">
            <h2 className="text-3xl font-bold">Ready to go on a adventure?</h2>
            <input
              type="text"
              className="w-[424px] h-[48px] rounded-3xl px-5 border-[2px] border-solid border-black bg-[#F2F2F2]"
              placeholder="Trip name"
              onChange={(e) => setItineraryName(e.target.value)}
              value={itineraryName}
            />
            <Image src={Modal} alt="modal-image" width={410} height={410} />
            <div className="flex gap-2">
              <button
                className="w-[152px] h-[40px] flex justify-around items-center px-4 py-2 rounded-3xl font-bold"
                style={{ border: "2px solid #FFC857" }}
                onClick={handleModal}
              >
                DON&apos;T SAVE
              </button>
              <button
                className="w-[152px] h-[40px] flex justify-around items-center px-4 py-2 bg-[#FFC857] rounded-3xl font-bold"
                onClick={savedItineraryToDb}
              >
                SAVE TRIP
              </button>
            </div>
            <div
              className="absolute right-6 top-4 cursor-pointer"
              onClick={handleModal}
            >
              <RxCross1 size={25} className="font-bold" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedTripsModal;
