import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [musicResults, setMusicResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);
  const [embedHtml, setEmbedHtml] = useState("");

  const musicAPI = `http://localhost:5000/api/search?q=${query}`;
  // const imageAPI = `http://localhost:5000/api/images?q=${query}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseMusic = await axios.get(musicAPI);
      // const responseImage = await axios.get(imageAPI);
      setMusicResults(responseMusic.data.data[0]);
      if (responseMusic) {
        //const trackUrl = `https://www.deezer.com/track/${responseMusic.id}`;
        const trackUrl = "https://www.deezer.com/track/102142414";

        const oembedResponse = await axios.get(
          `http://localhost:5000/api/oembed`,
          {
            params: {
              url: trackUrl,
              format: "json",
            },
          }
        );
        console.log(oembedResponse);
        setEmbedHtml(oembedResponse.data);
      }

      // console.log(responseMusic.data);
      // console.log(responseImage.data);
      // setImageResults(responseImage.data.results);
    } catch (e) {
      console.error("Error fetching data from APIs", e);
    }
  };

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
      <section>
        <h2>Music Results</h2>
        {embedHtml && <div dangerouslySetInnerHTML={{ __html: embedHtml }} />}
        <h2>Image Results</h2>
        {/* <ul>
          {imageResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul> */}
      </section>
    </section>
  );
}
