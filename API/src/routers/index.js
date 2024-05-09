import loginRouter from "./Login.js";
import NotesRouter from "./Notes.js";
import checkToken from "../middleware/authMiddleware.js";
import {
  getNotes,
  getNotesById
} from "../controller/Notes.controller.js";
const useRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("Welcome to the Node.js Tutori123al! - 3 3");
    });

    app.use(`/login`, loginRouter);

    app.use(`/notes/get/:id`,  getNotesById);
    app.use(`/notes/get`,  getNotes);

    app.use(`/notes`, checkToken, NotesRouter);

  
};

export default useRoutes;
