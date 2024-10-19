import { useState } from "react";
import axios from "axios";
import Images from "./ImageResults";

export default function Search() {
  const [query, setQuery] = useState("");
  const [imageResults, setImageResults] = useState([]);
  const [embedHtml, setEmbedHtml] = useState("");

  const musicAPI = `http://localhost:5000/api/search?q=${query}`;
  const imageAPI = `http://localhost:5000/api/unsplash?q=${query}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    event.target.value = "";
  };

  if (!imageResults) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex flex-col text-lg py-24 justify-center items-center">
      <div className="flex flex-col">
        <h1>Welcome! Please search any topic below.</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <section className="flex flex-col justify-center items-center">
        <h2>Search results for: {query}</h2>
        <h3>Music Results</h3>
        {embedHtml && <div dangerouslySetInnerHTML={{ __html: embedHtml }} />}
        <h3>Image Results</h3>
        <Images imageResults={imageResults} />
      </section>
    </section>
  );
}
