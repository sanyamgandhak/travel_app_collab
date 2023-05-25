import Image from "next/image";
import { FC } from "react";
import Logo from "../assets/logo.png";

interface Props {}

const Navbar: FC<Props> = ({}) => {
  return (
    <nav className="h-16 w-full bg-[#3F3D56] text-white">
      <section className=" flex justify-between items-center">
        {/* Logo */}
        <div className="px-[108px] py-[21px]">
          <Image src={Logo} alt="Logo" width={98} height={21} />
        </div>
        <div className="flex gap-8 px-[108px]">
          <h4 className="flex justify-center items-center py-1">
            Trip Planner <sup>AI</sup>
          </h4>
          <h4 className="flex justify-center items-center py-1">
            Explore Destinations
          </h4>
          <h4 className="flex justify-center items-center py-1">
            Saved Trips
          </h4>
          <p className="cursor-pointer border-solid border-[1px] border-[#ffc857] rounded-xl px-6 py-1 text-sm">
            GET STARTED
          </p>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
