import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

// testing get method
describe("GET /", () => {
  it("must respond with a 200 status code", async () => {
    const response = await request.get("/");

    expect(response.body.statusCode).toBe(200);
  });

  it("must see hello from backend to frontend!", async () => {
    const response = await request.get("/");
    expect(response.body.message).toBe("hello from backend to frontend!");
  });
});

//testing post method

describe("POST /", () => {
  //successful response
  it("must respond with 200 status code", async () => {
    const response = await request.post("/weather/Winterswijk");
    expect(response.statusCode).toBe(200);
  });
  it("response must contain city name and temp", async () => {
    const response = await request
      .post("/weather/alex")
      .not.toBe("City is not found!");
  });
  //failed response because of  invalid city name
  it("must respond with 400 status code", async () => {
    const response = await request.post("/weather/mmmmmmm");
    expect(response.statusCode).toBe(400);
  });
  //failed response because of missing city name
  it("missing city name", async () => {
    const response = await request.post("/weather/").toBe("City is not found!");
  });
});
