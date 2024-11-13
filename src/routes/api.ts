import { Router } from "express";

import {
  createMovie,
  deleteMovie,
  genres,
  getMovie,
  getMovies,
  names,
  updateMovie,
} from "../controllers/movieController";
import {
  createQuote,
  deleteQuote,
  getQuote,
  getQuotes,
  updateQuote,
} from "../controllers/quoteController";
import {
  emailVerify,
  login,
  logoOut,
  passwordReset,
  passwordVerify,
  userInfo,
  register,
} from "../controllers/authController";
import { getProfile, updateProfile } from "../controllers/profileController";
import {
  addEmail,
  deleteEmail,
  makeEmailPrimary,
  verifyAdditionalEmail,
} from "../controllers/emailController";
import { createComment } from "../controllers/commentController";
import {
  createNotification,
  updateNotification,
} from "../controllers/notificationController";
import { storeOrDestroyLike } from "../controllers/likeController";

const apiRouter = Router();

apiRouter
  .post("/login", login)
  .post("/log-out", logoOut)
  .get("/user-info", userInfo)
  .get("/verify", emailVerify);

apiRouter
  .post("/register", register)
  .post("/password-reset", passwordReset)
  .post("/password-verify", passwordVerify);

apiRouter
  .get("/movies", getMovies)
  .get("/movies/:id", getMovie)
  .get("/movie-genres", genres)
  .get("/movie-names", names)
  .post("/movies", createMovie)
  .put("/movies", updateMovie)
  .delete("/movies", deleteMovie);

apiRouter
  .get("/quotes", getQuotes)
  .get("/quotes/:id", getQuote)
  .post("/quotes", createQuote)
  .put("/quotes", updateQuote)
  .delete("/quotes", deleteQuote);

apiRouter.post("/comments", createComment);

apiRouter
  .post("/notifications", createNotification)
  .put("/notifications", updateNotification);

apiRouter.post("/store-or-destroy-like/:id", storeOrDestroyLike);

apiRouter.get("/profile", getProfile).put("/profile", updateProfile);

apiRouter
  .post("/email", addEmail)
  .post("/make-email-primary/:id", makeEmailPrimary)
  .post("/verify-email", verifyAdditionalEmail)
  .delete("/email/:id", deleteEmail);

export default apiRouter;
