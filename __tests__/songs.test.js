import router from "../routes/song-routes.js";
import app from "../app.js";
import request from "supertest";
import { pool } from "../database/index.js";

afterAll(async () => {
  await pool.end();
});

//GET ROUTES
describe("GET /songs", () => {
  it("responds to /songs", async () => {
    const actual = await request(app).get("/songs");
    expect(actual.status).toBe(200);
  });
});

describe("GET /songs/:id", () => {
  it("responds to /songs/:id", async () => {
    const actual = await request(app).get("/songs/1");
    expect(actual.statusCode).toBe(200);
    expect(actual.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

//POST ROUTES
describe("POST /songs", () => {
  // it("responds to /songs", async () => {
  //   const actual = await request(app).post("/songs").send({
  //     title: "some-title",
  //     artist: "some-artist",
  //     lastperformed: "01/01/2022",
  //   });
  //   expect(actual.status).toBe(200);
  //   expect(actual.headers["content-type"]).toEqual(
  //     expect.stringContaining("json")
  //   );
  // });

  it("should res 400 a post request if any of the properties are missing", async () => {
    const bodies = [
      {
        title: "some-title",
      },
      {
        artist: "some-artist",
      },
      { lastperformed: "01/01/2022" },
      {},
      {
        title: "some-title",
        artist: "some-artist",
      },
      {
        artist: "some-artist",
        lastperformed: "01/01/2022",
      },
      {
        title: "some-title",
        lastperformed: "01/01/2022",
      },
    ];

    for (const body of bodies) {
      const actual = await request(app).post("/songs").send(body);
      expect(actual.status).toBe(400);
    }
  });
});

//PUT ROUTES
describe("PUT /songs/:id", () => {
  it("responds to /songs/:id", async () => {
    const actual = await request(app).put("/songs/1").send({
      title: "some-title",
      artist: "some-artist",
      lastperformed: "01/01/2022",
    });
    expect(actual.status).toBe(200);
    expect(actual.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("should res 400 a put request if any of the properties are missing", async () => {
    const bodies = [
      {
        title: "some-title",
      },
      {
        artist: "some-artist",
      },
      { lastperformed: "01/01/2022" },
      {},
      {
        title: "some-title",
        artist: "some-artist",
      },
      {
        artist: "some-artist",
        lastperformed: "01/01/2022",
      },
      {
        title: "some-title",
        lastperformed: "01/01/2022",
      },
    ];

    for (const body of bodies) {
      const actual = await request(app).put("/songs/1").send(body);
      expect(actual.status).toBe(400);
    }
  });
});
