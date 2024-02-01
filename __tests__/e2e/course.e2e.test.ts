import request from "supertest";
import { HTTP_STATUS } from "../../src";
import { app } from "../../src/setting";

describe("/videos", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/videos").expect(HTTP_STATUS.OK_200, []);
  });

  it("should return 404 for not existing videos", async () => {
    await request(app)
      .get("/videos/-9999999")
      .expect(HTTP_STATUS.NOT_FOUND_404);
  });

  it("shouldn't create course with incorrect data", async () => {
    await request(app)
      .post("/videos")
      .send({
        title: 5,
        author: "string",
        availableResolutions: ["P144"],
      })
      .expect(HTTP_STATUS.BAD_REQUEST_400);
  });
});
