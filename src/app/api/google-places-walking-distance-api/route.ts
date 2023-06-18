import { axiosInstance } from "@/libs/config";
import cors from "@/libs/cors";

type RequestBody = {
    baseUrl: string,
    destinationPlaceId: string,
    originPlaceId: string
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json();

    const { baseUrl, destinationPlaceId, originPlaceId } = body

    const response = await axiosInstance.get(
        `${baseUrl}origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&avoid=ferries&mode=walking&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
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