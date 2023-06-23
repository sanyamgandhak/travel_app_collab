"use client";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAuthStore from "@/hooks/Auth";
import { db } from "@/libs/firebase";

interface Props {}

const SavedTrips: FC<Props> = ({}) => {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const [itinerary, setItinerary] = useState<DocumentData[]>([]);

  const handleDelete = async (uid: string) => {
    if (!currentUser) return;
    try {
      const documentRef = doc(db, "users", currentUser?.uid, "itinerary", uid);
      await deleteDoc(documentRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", currentUser?.uid, "itinerary"),
      (snapshot) => {
        const newData: DocumentData[] = [];
        snapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        setItinerary(newData);
      }
    );

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when the component is unmounted
    };
  }, [currentUser]);

  return (
    <div className="ml-10 mt-20">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl">Saved Trips</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Itineraries</h1>
          <button
            type="button"
            className="mr-10 bg-[#FFC857] px-5 py-1 rounded-3xl font-bold"
            onClick={() => router.push("create-itinerary")}
          >
            CREATE MORE
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {itinerary.map((item) => {
            const startDate = new Date(item.startDate) as any;
            const endDate = new Date(item.endDate) as any;
            const dateDifference = Math.floor(
              (endDate - startDate) / (1000 * 60 * 60 * 24)
            );

            return (
              <div key={item.uid} className="w-[32%] cursor-pointer relative">
                <Image
                  src={item.googleImageSavedTripsUrl}
                  alt=""
                  className="h-32 w-full rounded-xl object-cover brightness-50"
                  height={20}
                  width={300}
                  onClick={() => router.push(`/saved-trips/${item.uid}`)}
                />
                <div
                  className="absolute right-3 top-2"
                  onClick={() => handleDelete(item.uid)}
                >
                  <RiDeleteBin6Fill color="white" size={20} className="" />
                </div>
                <div className="absolute left-6 top-6 flex flex-col gap-3">
                  <h1 className="text-3xl text-white">{item.title}</h1>
                  <h1 className="text-sm text-white">
                    {dateDifference} Days Trip from{" "}
                    {startDate.toDateString().split(" ")[1]}{" "}
                    {startDate.toDateString().split(" ")[2]} -{" "}
                    {endDate.toDateString().split(" ")[1]}{" "}
                    {endDate.toDateString().split(" ")[2]}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedTrips;
