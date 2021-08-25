import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter
  .route("/videos/:id([0-9a-f]{24})/comment-delete")
  .all(protectorMiddleware)
  .get(deleteComment);

export default apiRouter;
