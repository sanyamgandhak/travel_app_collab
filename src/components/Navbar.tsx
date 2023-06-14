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
  const show = (paths: string[]): boolean => paths.includes(pathname);

  return (
    <ClientOnly>
      <nav className="w-full bg-[#44BBA4] text-white">
        <section className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="h-16 px-[108px] py-[12px] cursor-pointer flex items-center"
            onClick={() => router.push("/")}
          >
            <Image
              src={Logo}
              alt="Logo"
              width={98}
              height={21}
              className="h-10 w-32"
            />
          </div>
          {show([
            "/create-itinerary",
            "/itinerary",
            "/explore-destinations",
            "/destinations",
            "/saved-trips",
          ]) && (
            <div className="flex gap-8 px-[128px]">
              <h4
                className="flex justify-center items-center py-1 cursor-pointer"
                onClick={() => router.push("/create-itinerary")}
              >
                <span
                  className={` ${
                    isActive(["/create-itinerary", "/itinerary"])
                      ? "text-black underline font-bold"
                      : ""
                  }`}
                >
                  Trip Planner
                </span>
                <sup
                  className={` ${
                    isActive(["/create-itinerary", "/itinerary"])
                      ? "text-black no-underline font-bold"
                      : ""
                  }`}
                >
                  AI
                </sup>
              </h4>
              <h4
                className={`flex justify-center items-center py-1 cursor-pointer ${
                  isActive(["/explore-destinations"])
                    ? "text-black underline font-bold"
                    : ""
                }`}
                onClick={() => router.push("/explore-destinations")}
              >
                Explore Destinations
              </h4>
              <h4
                className={`flex justify-center items-center py-1 cursor-pointer ${
                  isActive(["/saved-trips"])
                    ? "text-black underline font-bold"
                    : ""
                }`}
                // onClick={() => router.push("/saved-trips")}
              >
                Saved Trips
              </h4>
            </div>
          )}
          <div className="absolute right-16">
            <BsPersonCircle
              color="black"
              className="h-9 w-9 rounded-full cursor-pointer mb-1"
            />
          </div>
        </section>
      </nav>
    </ClientOnly>
  );
};

export default Navbar;
