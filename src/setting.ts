import express, { Request, Response } from "express";
import { HTTP_STATUS, db } from ".";

export const app = express();

const jsonBodyMiddlewear = express.json();
app.use(jsonBodyMiddlewear);

app.get("/courses/", (req: Request, res: Response) => {
  let foundCorsesQuery = db.courses;
  if (req.query.message) {
    foundCorsesQuery = foundCorsesQuery.filter(
      (c) => c.message.indexOf(req.query.message as string) > -1
    );
  }
  res.send(foundCorsesQuery);
});

app.get("/courses/:id", (req: Request, res: Response) => {
  const foundCorses = db.courses.find((c) => c.id === +req.params.id);
  if (!foundCorses) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }
  res.send(foundCorses);
});

app.post("/courses/", (req: Request, res: Response) => {
  if (!req.body.message) {
    res.send(HTTP_STATUS.BAD_REQUEST_400);
    return;
  }

  const newCourse = {
    id: +new Date(),
    message: req.body.message,
  };
  db.courses.push(newCourse);
  res.status(HTTP_STATUS.CREATED_201).send(newCourse);
});

app.delete("/courses/:id", (req: Request, res: Response) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);

  res.status(HTTP_STATUS.NO_CONTENT_204);
});

app.put("/courses/:id", (req: Request, res: Response) => {
  if (!req.body.message) {
    res.send(HTTP_STATUS.BAD_REQUEST_400);
    return;
  }

  const foundCorses = db.courses.find((c) => c.id === +req.params.id);
  if (!foundCorses) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    return;
  }
  foundCorses.message = req.body.message;
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});

app.delete(
  "/hometask_01/api/testing/all-data",
  (req: Request, res: Response) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);
