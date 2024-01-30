import { app } from "./setting";

const port = 3000;

export const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

export const AvailableResolutions = [
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
];

export type VideoTypes = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: typeof AvailableResolutions;
};

export const videos: VideoTypes[] = [
  {
    id: 0,
    title: "string",
    author: "string",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2024-01-30T19:21:00.388Z",
    publicationDate: "2024-01-30T19:21:00.388Z",
    availableResolutions: ["P144"],
  },
];

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
