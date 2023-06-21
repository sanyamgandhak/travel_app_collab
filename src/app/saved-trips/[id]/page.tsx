"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { ItineraryDocumentData } from "@/libs/types/typings";
import useAuthStore from "@/hooks/Auth";
import { db } from "@/libs/firebase";

const IndividualSavedItinerary: FC = () => {
  const pathname = usePathname();
  const { currentUser } = useAuthStore();
  const itinenaryId = pathname.split("/")[2];
  const [itinerary, setItinerary] = useState<ItineraryDocumentData[]>([]);

  useEffect(() => {
    const fetchItinenary = async (uid: string) => {
      if (!currentUser) return;
      try {
        const itineraryRef = doc(
          db,
          "users",
          currentUser?.uid,
          "itinerary",
          uid
        );
        const documentSnapshot = await getDoc(itineraryRef);
        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data() as ItineraryDocumentData;
          const itinenaryArray = [];
          itinenaryArray.push(documentData);
          setItinerary(itinenaryArray);
        } else {
          console.log("Itinerary does not exist");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchItinenary(itinenaryId);
  }, [currentUser, itinenaryId]);

  useEffect(() => {
    localStorage.setItem("currentPathname", JSON.stringify(pathname));
  }, [pathname]);


  const startDateJsFormat = itinerary[0]?.startDate;
  const startDate = new Date(startDateJsFormat).toDateString();
  console.log("Startdate",startDate);

  const endDateJsFormat = itinerary[0]?.endDate;
  const endDate = new Date(endDateJsFormat).toDateString();
  console.log("EndDate",endDate);

  return (
    <main>
      <div>
        {itinerary.map((item: ItineraryDocumentData) => {
          return <div key={item.uid}></div>;
        })}
      </div>
    </main>
  );
};

export default IndividualSavedItinerary;
