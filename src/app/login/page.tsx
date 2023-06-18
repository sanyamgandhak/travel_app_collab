"use client";
import { ChangeEvent, FC, useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import ClientOnly from "@/components/ClientOnly";
import { auth } from "@/libs/firebase";

const Login: FC = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      toast.success("Logged In");
      router.push(currentPath);
    } catch (error: any) {
      console.error("Error logging into your account", error);
    }
  };

  useEffect(() => {
    const currentPathname = localStorage?.getItem("currentPathname");
    const parsedPathname = currentPathname ? JSON.parse(currentPathname) : null;
    setCurrentPath(parsedPathname);
  }, []);

  return (
    <ClientOnly>
      <section className="flex flex-col items-center justify-center h-full w-full gap-[30px]">
        <h1 className="text-5xl">Log in to your account</h1>
        <input
          type="text"
          className="w-[410px] h-[48px] rounded-3xl border-2 border-gray-500 px-10"
          placeholder="Email"
          value={user.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-[410px] h-[48px] rounded-3xl border-2 border-gray-500 pl-10 pr-16"
            placeholder="Password"
            value={user.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, password: e.target.value })
            }
          />
          {user.password.length !== 0 && (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[9px] cursor-pointer"
            >
              {!showPassword ? (
                <AiFillEyeInvisible size={25} />
              ) : (
                <AiFillEye size={25} />
              )}
            </span>
          )}
        </div>

        <button
          type="button"
          className="w-[410px] h-[38px] rounded-3xl bg-[#FFC857] font-bold"
          onClick={handleSubmit}
        >
          LOG IN
        </button>

        {/* <div className="flex gap-5 items-center">
          <div
            className=" w-[147px] h-0"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.6)",
            }}
          />
          <h4>OR</h4>
          <div
            className="w-[147px] h-0"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.6)",
            }}
          />
        </div> */}

        {/* <div className="w-[410px] h-[48px] rounded-3xl shadow-lg border-1 flex items-center justify-center gap-4 cursor-pointer">
          <FcGoogle size={25} />
          <h1 className="text-xl">Continue with Google</h1>
        </div> */}

        {/* <div className="w-[410px] h-[48px] rounded-3xl flex items-center justify-center gap-4 bg-[#1877F2] cursor-pointer">
          <SiFacebook size={25} color="white" />
          <h1 className="text-xl text-white">Continue with Facebook</h1>
        </div> */}
        <div>
          Don&apos;t have an account?{" "}
          <span
            className="underline font-bold cursor-pointer"
            onClick={() => router.push("register")}
          >
            Sign Up
          </span>
        </div>
      </section>
    </ClientOnly>
  );
};

export default Login;
