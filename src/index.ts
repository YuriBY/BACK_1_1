import { app } from "./setting";

const port = 3000;

export const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

export const db = {
  courses: [
    { id: 1, message: "Hello World. Hiiiii!" },
    { id: 2, message: "Hilary!" },
    { id: 3, message: "World" },
  ],
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
