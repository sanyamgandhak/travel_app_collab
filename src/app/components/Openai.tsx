"use client";
import { FC, useState, Fragment } from "react";

interface Props {}

const Openai: FC<Props> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<String>("");

  console.log(response);

  const prompt = `Q: ${input}`;
  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div className="h-24 w-1/2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        className="focus:ring-neu w-full rounded-md border border-neutral-400
         p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
        placeholder={"e.g. What is React?"}
      />
      {!loading ? (
        <button
          className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
          onClick={(e) => generateResponse(e)}
        >
          Generate Response &rarr;
        </button>
      ) : (
        <button
          disabled
          className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
        >
          <div className="animate-pulse font-bold tracking-widest">...</div>
        </button>
      )}
      {response && (
        <div className="mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100 overflow-auto">
          {response.split("\n").map((line, index) => {
            if (line.startsWith("Day")) {
              return (
                <div key={index} className="font-bold mt-4">
                  {line}
                </div>
              );
            } else if (line.startsWith("Overview:")) {
              return (
                <div key={index} className="font-medium mt-2">
                  {line}
                </div>
              );
            } else if (line.startsWith("City/Area")) {
              return (
                <div key={index} className="font-medium mt-2">
                  {line}
                </div>
              );
            } else if (line.trim() !== "") {
              const parts = line.split(". ");
              const pointNum = parts.shift();
              const pointText = parts.join(". ");
              return (
                <div key={index} className="pl-4 mt-2">
                  {pointNum}. {pointText}
                </div>
              );
            } else {
              return <br key={index} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Openai;
