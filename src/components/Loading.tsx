import Image from "next/image";
import { FC } from "react";
import Loader from "../assets/loading.png";

interface Props {}

const Loading: FC<Props> = ({}) => {
  return (
    <aside className="flex flex-col items-center justify-center gap-2 mt-20 animate-pulse">
      <Image src={Loader} alt="Loader" className="w-[450px] h-[432px]" />
      <div>
        <h1 className="w-[700px] h-[66px] font-bold text-xl">Hang tight while our website is catching some z&apos;s, dreaming up the perfect itinerary for your next adventure</h1>
      </div>
    </aside>
  );
};

export default Loading;
