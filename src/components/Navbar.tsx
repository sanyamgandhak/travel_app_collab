"use client";
import Image from "next/image";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BsPersonCircle } from "react-icons/bs";
import Logo from "../assets/largelogo.png";
import ClientOnly from "./ClientOnly";

interface Props {}

const Navbar: FC<Props> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (paths: string[]): boolean => paths.includes(pathname);
  return (
    <ClientOnly>
      <nav className="w-full bg-[#003300] text-white">
        <section className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="h-16 px-[108px] py-[12px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={Logo} alt="Logo" width={98} height={21} />
          </div>
          <div className="flex gap-8 px-[108px]">
            <h4
              className={`flex justify-center items-center py- cursor-pointer ${
                isActive(["/create-itinerary", "/itinerary"])
                  ? "text-[#ffc857]"
                  : ""
              }`}
              onClick={() => router.push("/create-itinerary")}
            >
              Trip Planner <sup>AI</sup>
            </h4>
            <h4
              className={`flex justify-center items-center py-1 cursor-pointer ${
                isActive(["/explore-destinations","/destinations"]) ? "text-[#ffc857]" : ""
              }`}
              onClick={() => router.push("/explore-destinations")}
            >
              Explore Destinations
            </h4>
            <h4
              className={`flex justify-center items-center py-1 cursor-pointer ${
                isActive(["/saved-trips"]) ? "text-[#ffc857]" : ""
              }`}
              // onClick={() => router.push("/saved-trips")}
            >
              Saved Trips
            </h4>
            <div>
              {isActive(["/"]) ? (
                <p className="cursor-pointer border-solid border-[2px] border-[#FFC857] bg-[#FFC857] text-black rounded-3xl px-6 py-1 text-sm">
                  GET STARTED
                </p>
              ) : (
                <BsPersonCircle
                  color="#ffc857"
                  className="h-9 w-9 rounded-full cursor-pointer mb-1"
                />
              )}
            </div>
          </div>
        </section>
      </nav>
    </ClientOnly>
  );
};

export default Navbar;
