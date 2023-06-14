import { axiosInstance } from "@/libs/config";
import axios from "axios";

const handleMapClick = async (locationName: string) => {
  const placeIdObj = JSON.parse(localStorage.getItem("imageMapUrl")!);
  const place_id = placeIdObj[locationName];
  const response = await axiosInstance.post("/api/google-places-maps-api", {
    place_id,
  });
  const mapDetails = await response.data;
  const mapUrl = mapDetails.result.url;
  window.open(mapUrl, "_blank");
};

export default handleMapClick;
