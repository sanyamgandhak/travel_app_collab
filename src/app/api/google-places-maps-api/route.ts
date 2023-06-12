import cors from "@/libs/cors";
import axios from "axios";

type RequestBody = {
    place_id: string
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json();

    const { place_id } = body

    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Cgeometry%2Cphoto%2Cformatted_address%2Curl&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
      );

    const results = await response.data;
    return cors(
        req,
        new Response(JSON.stringify(results), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    );
}

export async function OPTIONS(request: Request) {
    return cors(
        request,
        new Response(null, {
            status: 204,
        })
    );
}