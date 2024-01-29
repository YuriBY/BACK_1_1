import request from "supertest";
import { HTTP_STATUS } from "../../src";
import { app } from "../../src/setting";

describe("/courses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUS.OK_200, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app)
      .get("/courses/9999999")
      .expect(HTTP_STATUS.NOT_FOUND_404);
  });

  it("shouldn't create course with incorrect data", async () => {
    await request(app)
      .post("/courses")
      .send({ message: "" })
      .expect(HTTP_STATUS.BAD_REQUEST_400);
  });
});
