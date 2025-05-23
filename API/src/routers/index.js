import loginRouter from "./Login.js";
import NotesRouter from "./Notes.js";
import checkToken from "../middleware/authMiddleware.js";
import {
  getNotes,
  getNotesById
} from "../controller/Notes.controller.js";
const useRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send(`Hi, tuantrandevzz77.site z : ${process.env.ENV}: `);
    });

    app.use(`/login`, loginRouter);

    app.use(`/notes/get/:id`,  getNotesById);
    app.use(`/notes/get`,  getNotes);

    app.use(`/notes`, checkToken, NotesRouter);

  
};

export default useRoutes;
