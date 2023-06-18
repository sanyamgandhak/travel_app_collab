import { auth } from "@/libs/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type RequestBody = {
    username: string,
    email: string,
    password: string
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json()

    const { username, email, password } = body;

    try {
        const firebaseResponse = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(firebaseResponse.user, {
            displayName: username
        })

        return new Response(JSON.stringify({ response: "User created" }), { status: 201 })
    } catch (error: any) {
        console.error(error.message)
    }
}
