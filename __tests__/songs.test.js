import router from "../routes/song-routes.js";
import app from "../app.js";
import request from "supertest";
import { pool } from "../database/index.js";

afterAll(async () => {
  await pool.end();
});

describe("GET /songs", () => {
  it("responds to /songs", async () => {
    const actual = await request(app).get("/songs");
    expect(actual.statusCode).toBe(200);
  });
});

describe("GET /songs/:id", () => {
  it("responds to /songs/:id", async () => {
    const actual = await request(app).get("/songs/59");
    console.log(actual);
    expect(actual.statusCode).toBe(200);
    expect(actual.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
