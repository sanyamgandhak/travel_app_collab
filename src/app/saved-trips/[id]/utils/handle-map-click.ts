"use client";
import { axiosInstance } from "@/libs/config";
import { toast } from "react-hot-toast";

const handleMapClick = async (locationName: string, imageMapUrl: {[key: string]: string}) => {
  const place_id = imageMapUrl[locationName];
  const response = await axiosInstance.post("/api/google-places-maps-api", {
    place_id,
  });
  const mapDetails = await response.data;
  const mapUrl = mapDetails?.result?.url;
  if (!mapUrl || mapUrl === null) {
    toast.error("No map url for this place");
  } else {
    window.open(mapUrl, "_blank");
  }
};

export default handleMapClick;
