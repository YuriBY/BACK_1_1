import express, { Request, Response } from "express";
import { AvailableResolutions, HTTP_STATUS, VideoTypes, videos } from ".";

export const app = express();

const jsonBodyMiddlewear = express.json();
app.use(jsonBodyMiddlewear);

app.get("/videos", (req: Request, res: Response) => {
  res.send(videos);
});

app.delete("/testing/all-data",
    (req: Request, res: Response) => {
      videos.length = 0;
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  );

type RequesWithParams<P> = Request<P, unknown, unknown, unknown>;

type Param = {
  id: number
};

type RequesWithBody<B> = Request<unknown, B, unknown, unknown>;

type CreateVideoType = {
  title: string,
  author: string,
  availableResolutions: typeof AvailableResolutions

};

type ErrorMessageType = {
  field: string,
  message: string
};

type ErrorType = {
  Errormessage: ErrorMessageType[]
};

app.get("/videos/:id", (req: RequesWithParams<Param>, res: Response) => {
  const foundVideos = videos.find((c) => c.id === +req.params.id);
  if (!foundVideos) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }
  res.send(foundVideos);
});

app.post("/videos", (req: RequesWithBody<CreateVideoType>, res: Response) => {
  const errors: ErrorType = {
    Errormessage: []
  };
  
  let {title: string, author: string, publicationDate: string[]} = req.body;

  if (!title || typeof title !== string || title.trim() || title.trim().length > 40) {
    errors.Errormessage.push({message: "Incorrect title", field: "title"})
  };

  if (!author || typeof author !== string || author.trim() || author.trim().length > 20) {
    errors.Errormessage.push({message: "Incorrect author", field: "author"})
  }

  // if (!req.body.title) {
  //   res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
  //       .send({
  //         "errorsMessages": [
  //           {
  //             "message": "Error",
  //             "field": "title"
  //           }
  //         ]
  //       });
  //   return;
  // }

  const newVideo: VideoTypes = {
    id: +new Date(),
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: `${new Date()}`,
    publicationDate: `${new Date()}`,
    availableResolutions: req.body.availableResolutions
  };

  videos.push(newVideo);
  res.status(HTTP_STATUS.CREATED_201).send(newVideo);
});

// app.delete("/courses/:id", (req: Request, res: Response) => {
//   db.courses = db.courses.filter((c) => c.id !== +req.params.id);

//   res.status(HTTP_STATUS.NO_CONTENT_204);
// });







// app.put("/courses/:id", (req: Request, res: Response) => {
//   if (!req.body.message) {
//     res.send(HTTP_STATUS.BAD_REQUEST_400);
//     return;
//   }

//   const foundCorses = db.courses.find((c) => c.id === +req.params.id);
//   if (!foundCorses) {
//     res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
//     return;
//   }
//   foundCorses.message = req.body.message;
//   res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
// });

