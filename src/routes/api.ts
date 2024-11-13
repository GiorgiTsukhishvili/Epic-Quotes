import { Router, Request, Response } from "express";

const apiRouter = Router();

apiRouter.get("/test", (req: Request, res: Response) => {
  res.send("GOod");
});

apiRouter
  .post("/login", (req: Request, res: Response) => {})
  .post("/log-out", (req: Request, res: Response) => {})
  .get("/user-info", (req: Request, res: Response) => {})
  .get("/verify", (req: Request, res: Response) => {});

apiRouter
  .post("/register", (req: Request, res: Response) => {})
  .post("/password-reset", (req: Request, res: Response) => {})
  .post("/password-verify'", (req: Request, res: Response) => {})
  .get("/verify", (req: Request, res: Response) => {});

apiRouter
  .get("/movies", (req: Request, res: Response) => {})
  .get("/movies/:id", (req: Request, res: Response) => {})
  .get("/movie-genres", (req: Request, res: Response) => {})
  .get("/movie-names", (req: Request, res: Response) => {})
  .post("/movies", (req: Request, res: Response) => {})
  .put("/movies", (req: Request, res: Response) => {})
  .delete("/movies", (req: Request, res: Response) => {});

apiRouter
  .get("/quotes", (req: Request, res: Response) => {})
  .get("/quotes/:id", (req: Request, res: Response) => {})
  .post("/quotes", (req: Request, res: Response) => {})
  .put("/quotes", (req: Request, res: Response) => {})
  .delete("/quotes", (req: Request, res: Response) => {});

apiRouter.post("/comments", (req: Request, res: Response) => {});

apiRouter
  .post("/notifications", (req: Request, res: Response) => {})
  .put("/notifications", (req: Request, res: Response) => {});

apiRouter
  .get("/profile", (req: Request, res: Response) => {})
  .put("/profile", (req: Request, res: Response) => {});

apiRouter
  .post("/email", (req: Request, res: Response) => {})
  .post("/make-email-primary/:id", (req: Request, res: Response) => {})
  .post("/verify-email", (req: Request, res: Response) => {})
  .delete("/email/:id", (req: Request, res: Response) => {});

export default apiRouter;
