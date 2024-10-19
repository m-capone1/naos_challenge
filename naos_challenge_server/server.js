import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(
      `https://api.deezer.com/search?q=${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching music data:", error);
    res.status(500).json({ error: "Error fetching music data" });
  }
});

app.get("/api/oembed", async (req, res) => {
  const trackUrl = req.query.url;
  const format = req.query.format || "json";

  try {
    const response = await axios.get(
      `https://api.deezer.com/oembed?url=${trackUrl}&format=${format}&autoplay=true`
    );

    res.json(response.data.html);
  } catch (error) {
    console.error("Error fetching oEmbed data:", error);
    res.status(500).json({ error: "Error fetching oEmbed data" });
  }
});

app.get("/api/unsplash", async (req, res) => {
  const client_id = "0IyuvwDIwuzObyqGnE9rlznsrjxpmCSN7_SVjF_QZLU";
  const query = req.query.q;

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${query}&page=1`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching oEmbed data:", error);
    res.status(500).json({ error: "Error fetching oEmbed data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
