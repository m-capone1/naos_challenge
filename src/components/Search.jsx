import { useState } from "react";
import axios from "axios";
import Images from "./ImageResults";

export default function Search() {
  const [query, setQuery] = useState("");
  const [imageResults, setImageResults] = useState([]);
  const [embedHtml, setEmbedHtml] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState("");

  const baseUrl = "https://naoschallenge-production.up.railway.app";
  const musicAPI = `${baseUrl}/api/search?q=${query}`;
  const imageAPI = `${baseUrl}/api/unsplash?q=${query}`;

  //handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //set error state if query is empty
    if (!query.trim()) {
      setError("Please enter a valid search query.");
      return;
    }

    //reset states after successful form submission
    setError("");
    setLoading(true);
    setLastSearch(query);
    setQuery("");
    setImageResults([]);
    setEmbedHtml("");

    //fetch data from APIs with axios
    try {
      const [responseMusic, responseImage] = await Promise.all([
        axios.get(musicAPI),
        axios.get(imageAPI),
      ]);

      const musicId = responseMusic.data.data[0]?.id;
      setImageResults(responseImage.data.results);

      //fetch music data if musicId is available
      if (musicId) {
        const trackUrl = `https://www.deezer.com/track/${musicId}`;
        const oembedResponse = await axios.get(`${baseUrl}/api/oembed`, {
          params: {
            url: trackUrl,
            format: "json",
          },
        });
        setEmbedHtml(oembedResponse.data);
      }
    } catch (e) {
      console.error("Error fetching data from APIs", e);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-2 bg-emerald-600 text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
      <section className="flex flex-col justify-center items-center pt-8 w-full">
        {lastSearch && (
          <h2 className="py-4">Search results for: {lastSearch}</h2>
        )}
        <h3 className="font-bold m-4 text-xl">Music Results</h3>
        {embedHtml ? (
          <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
        ) : (
          !loading && <p className="text-red-600">No music available.</p>
        )}
        <h3 className="font-bold m-4 text-xl">Image Results</h3>
        <Images imageResults={imageResults} />
      </section>
    </section>
  );
}
