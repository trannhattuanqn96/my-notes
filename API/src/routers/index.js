
import loginRouter from './Login.js';

const useRoutes = (app) => {
    app.get('/', (req,res) => {
        res.send('Welcome to the Node.js Tutorial! - ');
    });
    app.use(`/login`, loginRouter);
};

export default useRoutes;