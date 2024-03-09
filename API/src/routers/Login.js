import { Router } from 'express';
import { Login } from '../controller/Auth.controller.js'

const router = Router();

router.post('/', Login);

export default router;