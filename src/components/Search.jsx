import { useState } from "react";
import axios from "axios";
import Images from "./ImageResults";

export default function Search() {
  const [query, setQuery] = useState("");
  const [imageResults, setImageResults] = useState([]);
  const [embedHtml, setEmbedHtml] = useState("");
  const [error, setError] = useState(false);

  const musicAPI = `http://localhost:5000/api/search?q=${query}`;
  const imageAPI = `http://localhost:5000/api/unsplash?q=${query}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const responseMusic = await axios.get(musicAPI);
      const responseImage = await axios.get(imageAPI);
      const musicId = responseMusic.data.data[0].id;

      setImageResults(responseImage.data.results);
      if (musicId) {
        const trackUrl = `https://www.deezer.com/track/${musicId}`;

        const oembedResponse = await axios.get(
          `http://localhost:5000/api/oembed`,
          {
            params: {
              url: trackUrl,
              format: "json",
            },
          }
        );
        setEmbedHtml(oembedResponse.data);
      }
    } catch (e) {
      console.error("Error fetching data from APIs", e);
    }

    setQuery("");
  };

  return (
    <section className="flex flex-col text-lg py-24 justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl lg:text-4xl pb-8">
          Welcome! Please search any topic below.
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={`w-1/2 p-3 border rounded-md focus:outline-none ${
            error
              ? "border-red-600 ring-red-300"
              : "border-gray-300 focus:ring-2 focus:ring-emerald-600"
          }`}
        />
        {error && (
          <p className="text-red-600 mt-2">Please enter a search query.</p>
        )}
        {""}
        <button
          type="submit"
          className="mt-2 bg-emerald-600 text-white py-2 px-4 rounded-md"
        >
          Search
        </button>
      </form>
      <section className="flex flex-col justify-center items-center pt-8 w-full">
        <h2 className="py-4">Search results for: {query}</h2>
        <h3 className="font-bold m-4 text-xl">Music Results</h3>
        {embedHtml && <div dangerouslySetInnerHTML={{ __html: embedHtml }} />}
        <h3 className="font-bold m-4 text-xl">Image Results</h3>
        <Images imageResults={imageResults} />
      </section>
    </section>
  );
}
