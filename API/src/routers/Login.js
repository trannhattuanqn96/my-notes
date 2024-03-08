import { Router } from 'express';

const router = Router();

router.get('/', () => {
    res.send('Vào đây là login get');
});