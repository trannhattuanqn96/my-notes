import loginRouter from "./Login.js";
import NotesRouter from "./Notes.js";
import checkToken from "../middleware/authMiddleware.js";

const useRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome to the Node.js Tutorial! - ");
  });

  app.use(`/login`, loginRouter);

  app.use(`/notes`, checkToken, NotesRouter);
};

export default useRoutes;
