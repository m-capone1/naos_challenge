import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [musicResults, setMusicResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);

  const musicAPI = `https://api.deezer.com/search?q=${query}`;
  const imageAPI = ``;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseMusic = await axios.get(musicAPI);
      const responseImage = await axios.get(imageAPI);
      console.log(responseMusic.data);
      console.log(responseImage.data);
      setMusicResults(responseMusic.data);
      setImageResults(responseImage.data);
    } catch (e) {
      console.e("Error fetching data from APIs", e);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* <section>
        <h2>Music Results</h2>
        <ul>
          {musicResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
        <h2>Image Results</h2>
        <ul>
          {imageResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      </section> */}
    </section>
  );
}
