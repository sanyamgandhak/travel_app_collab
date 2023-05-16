import { auth } from "@/app/libs/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

type RequestBody = {
    email: string,
    password: string
}

export async function POST(req: Request) {

    const body: RequestBody = await req.json()
    const { email, password } = body

    try {
        await signInWithEmailAndPassword(auth, email, password)
        const { currentUser } = auth
        return new Response(JSON.stringify({ email: currentUser?.email, username: currentUser?.displayName }), { status: 200 })
    } catch (error: any) {
        console.error(error.message)
    }


}