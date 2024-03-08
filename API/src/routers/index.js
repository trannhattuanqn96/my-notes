
import loginRouter from './Login';
const useRoutes = (app) => {
    app.get('/', () => {
        res.send('Welcome to the Node.js Tutorial! - ');
    });
    app.use(`/login`, loginRouter);
};

export default useRoutes;