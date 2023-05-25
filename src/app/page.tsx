"use client";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import ClientOnly from "./components/ClientOnly";
// import Openai from "./components/Openai";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { landingPageData } from "./constants/landingPage";
import { useRouter } from "next/navigation";

const Testimonials = ({
  image,
  desc,
  name,
}: {
  image: string | StaticImageData;
  desc: string;
  name: string;
}) => (
  <div className="flex items-center gap-6 h-[240px] px-5">
    <Image src={image} alt="People1" className="rounded-full h-20 w-20" />
    <div className="relative">
      <p className="text-lg font-medium mt-3">{desc}</p>
      <p className="absolute right-5 bottom-[-55px] text-lg font-bold">
        - {name}
      </p>
    </div>
  </div>
);

const Cards = ({
  imageUrl,
  description,
  heading,
  reverse,
}: {
  imageUrl: string | StaticImageData;
  description: string;
  heading: string;
  reverse?: boolean;
}) => (
  <div
    className={`px-40 flex ${
      reverse ? "flex-row-reverse" : "flex-row"
    } items-center  gap-[420px]`}
  >
    <Image src={imageUrl} alt="Svg3" className="h-[340px] w-[530px]" />
    <div className="flex flex-col gap-2 w-[630px] h-[240px]">
      <h1 className="text-4xl font-bold">{heading}</h1>
      <p className="text-xl font-medium">{description}</p>
    </div>
  </div>
);

export default function Home() {
  const scrollToDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const scrollToNext = () => {
    if (scrollToDivRef.current) {
      scrollToDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ClientOnly>
      <div className="flex flex-col w-full h-full gap-32">
        <div className="w-full h-full relative">
          <Image
            src={landingPageData.Cover.imageUrl}
            className="object-cover w-full h-[825px]"
            alt="Cover"
          />
          <div className="absolute top-[30%] left-[5%] w-[750px] flex flex-col gap-10">
            <div>
              <h1 className="text-7xl">{landingPageData.Cover.title1}</h1>
              <h1 className="text-7xl">{landingPageData.Cover.title2}</h1>
            </div>
            <div>
              <p className="text-3xl">{landingPageData.Cover.description}</p>
            </div>
            <button className="bg-[#ffc857] rounded-xl h-12 w-60 font-bold text-xl" onClick={()=>router.push('create-itinerary')}>
              START PLANNING
            </button>
          </div>

          <div
            className="absolute bottom-[5%] right-[50%] cursor-pointer"
            onClick={scrollToNext}
          >
            <BsArrowDownCircle
              color="white"
              className="h-10 w-10 animate-bounce"
            />
          </div>
        </div>
        {/* Cards */}
        <div
          className="w-full px-10 items-center text-center flex flex-col gap-32"
          ref={scrollToDivRef}
        >
          <Cards
            description={landingPageData.Cards.Section1.description}
            heading={landingPageData.Cards.Section1.heading}
            imageUrl={landingPageData.Cards.Section1.imageUrl}
          />
          <Cards
            description={landingPageData.Cards.Section2.description}
            heading={landingPageData.Cards.Section2.heading}
            imageUrl={landingPageData.Cards.Section2.imageUrl}
            reverse
          />
          <Cards
            description={landingPageData.Cards.Section3.description}
            heading={landingPageData.Cards.Section3.heading}
            imageUrl={landingPageData.Cards.Section3.imageUrl}
          />
        </div>

        {/* Testimonials */}
        <div className="w-full px-20 items-center text-center flex gap-28 mt-20">
          <Testimonials
            desc={landingPageData.Testimonials.Person1.description}
            image={landingPageData.Testimonials.Person1.imageUrl}
            name={landingPageData.Testimonials.Person1.name}
          />
          <Testimonials
            desc={landingPageData.Testimonials.Person2.description}
            image={landingPageData.Testimonials.Person2.imageUrl}
            name={landingPageData.Testimonials.Person2.name}
          />
          <Testimonials
            desc={landingPageData.Testimonials.Person3.description}
            image={landingPageData.Testimonials.Person3.imageUrl}
            name={landingPageData.Testimonials.Person3.name}
          />
        </div>

        {/* Footer */}

        <footer className="mt-36 text-center mx-40 mb-20 flex flex-col gap-8 items-center">
          <h1 className="text-6xl font-bold text-[#3F3D56]">
            Try the easiest way to create your trips now!
          </h1>
          <button className="bg-[#ffc857] rounded-xl h-12 w-60 font-bold text-xl">
            START PLANNING
          </button>
          <button
            className="flex flex-col items-center mt-20 gap-2 animate-bounce"
            onClick={scrollToTop}
          >
            <BsArrowUpCircle className="h-16 w-16" />
            <h3 className="text-3xl font-extrabold">Back to Top</h3>
          </button>
        </footer>
      </div>
    </ClientOnly>
  );
}
