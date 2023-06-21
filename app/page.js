"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [id, setId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = async () => {
    setIsLoading(true);
    setId(Math.floor(Math.random() * 100 + 1));

    try {
      const quote = await (
        await fetch(`https://dummyjson.com/quotes/${id}`)
      ).json();
      setData(quote);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleClick();
    console.log("ran");
  }, []);
  return (
    <div className="flex items-center h-screen mx-auto">
      <div
        id="quote-box"
        className="max-w-lg min-w-[300px] mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow "
      >
        {isLoading ? (
          <>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </>
        ) : (
          <h1
            id="text"
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {data.quote}
          </h1>
        )}
        <br />

        {isLoading ? (
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        ) : (
          <p id="author" className="mb-3 font-normal text-gray-700 ">
            {data.author}
          </p>
        )}
        <button
          id="new-quote"
          onClick={handleClick}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          Generate
        </button>
        <a
          id="tweet-quote"
          className="twitter-share-button"
          target="_blank"
          href={`https://twitter.com/intent/tweet?text="${data.quote}" - ${data.author}`}
          data-size="large"
        >
          <button disabled={isLoading}>Tweet</button>
        </a>
      </div>
    </div>
  );
}
