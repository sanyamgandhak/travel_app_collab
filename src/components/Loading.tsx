'use client'
import Image from "next/image";
import { FC } from "react";
import { useState, useEffect } from "react";
import Loader from "../assets/loading.png";
import image1 from '../assets/loader/Page1.png'
import image2 from '../assets/loader/Page2.png'
import image3 from '../assets/loader/Page3.png'
import image4 from '../assets/loader/Page4.png'
import image5 from '../assets/loader/Page5.png'
import image6 from '../assets/loader/Page6.png'
import image7 from '../assets/loader/Page7.png'
import image8 from '../assets/loader/Page8.png'

interface Props {}

const Loading: FC<Props> = ({}) => {
  const imageArray = [image1, image2, image3, image4, image5, image6, image7, image8];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if(index == imageArray.length-1) {
        setIndex(0);
      }else{
        setIndex((index) => index+1);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <aside className="flex flex-col items-center justify-center gap-2 mt-40 animate-pulse">
      <Image src={imageArray[index]} alt="Loader" className="w-[280px] h-[280px]" />
      <div>
        <h1 className="w-[700px] h-[66px] font-bold text-xl">Hang tight while our website is catching some z&apos;s, dreaming up the perfect itinerary for your next adventure</h1>
      </div>
    </aside>
  );
};

export default Loading;
