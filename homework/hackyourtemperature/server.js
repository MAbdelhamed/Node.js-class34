import express from "express";
import fetch from "node-fetch";
import { API } from "./sources/keys.js";

const app = express();
const port = process.env.port || 3000;
app.use(express.json());

app.get("/", (request, response) =>
  response.send("hello from backend to frontend!")
);

app.post("/weather/:cityName", async (request, response) => {
  const cityName = request.params.cityName;
  console.log(cityName);
  try {
    if (cityName) {
      const weather = await fetch(
        `${API.url}q=${cityName}&units=metric&APPID=${API.key}`
      );
      const fetchData = await weather.json();
      if (weather.status === 404) {
        response.sendStatus(404);
      } else {
        response.send({
          weatherText: `${cityName}  ${fetchData.main.temp.toFixed(2)}`,
        });
      }
    } else {
      response.send({ weatherText: "City is not found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`server is running from port: ${port} `));
