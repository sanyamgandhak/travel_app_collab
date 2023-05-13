"use client";
import ClientOnly from "./components/ClientOnly";
import Openai from "./components/Openai";
import useCounter from "./hooks/useConter";

export default function Home() {
  const { count, increment, decrement, reset, logCount } = useCounter();
  return (
    <ClientOnly>
      <div className="flex flex-col items-center h-screen gap-5 mb-10">
        <div className="">
          <h1 className="text-4xl font-bold text-center mb-8 mt-16">Count: {count}</h1>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={increment}
            >
              Increment
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={decrement}
            >
              Decrement
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={logCount}
            >
              Log Count
            </button>
          </div>
        </div>

        <Openai />
      </div>
    </ClientOnly>
  );
}
