import express from "express";
import fetch from "node-fetch";
import { API } from "./sources/keys.js";

export const app = express();

app.use(express.json());

app.get("/", (request, response) =>
  response.send({ message: "hello from backend to frontend!" })
);

app.post("/weather/:cityName", async (request, response) => {
  const cityName = request.params.cityName;
  try {
    if (cityName) {
      const weather = await fetch(
        `${API.url}q=${cityName}&units=metric&APPID=${API.key}`
      );
      const fetchData = await weather.json();
      if (weather.status === 400) {
        response.sendStatus(400);
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
