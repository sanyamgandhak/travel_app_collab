import { DocumentData, Timestamp } from "firebase/firestore";

interface ItineraryDocumentData extends DocumentData {
    googleImageSavedTripsUrl: string;
    itinerary: string[];
    uid: string;
    title: string;
    timestamp: Timestamp;
    endDate: Date;
    startDate: Date;
    imageMapUrl: {[key: string]},
    imageUrl: {[key: string]},
    distance: [string],
  }