import cors from "@/libs/cors";
import axios from "axios";

type RequestBody = {
    photoBaseUrl: string,
    photo_reference: string,
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json();

    const { photoBaseUrl, photo_reference } = body

    const photoResponse = await axios.get(
        `${photoBaseUrl}?maxwidth=1600&maxheight=1600&photo_reference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_MAP_KEY}`
      );

    const results = photoResponse.config.url;
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