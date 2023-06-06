const handleMapClick = async (locationName: string) => {
  const placeIdObj = JSON.parse(localStorage.getItem("imageMapUrl")!);
  const place_id = placeIdObj[locationName];
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Cgeometry%2Cphoto%2Cformatted_address%2Curl&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
  );
  const mapDetails = await response.json();
  const mapUrl = mapDetails.result.url;
  window.open(mapUrl, '_blank');
}

export default handleMapClick;