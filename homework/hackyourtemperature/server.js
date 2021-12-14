import express from "express";

const weatherApp = express();
const port = process.env.port || 3000;
weatherApp.use(express.json());

weatherApp.get("/", (request, response) =>
  response.send("hello from backend to frontend!")
);

weatherApp.post("/weather", (request, response) => {
  const city = request.body.cityName;
  response.json(city);
});

weatherApp.listen(port, () =>
  console.log(`server is running from port: ${port} `)
);
