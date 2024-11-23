'use strict';
import { Router } from 'express';
import LoginController from '../controllers/LoginController.js';
const router = Router();

router.post('/signup', LoginController.signup);
router.post('/signin', LoginController.signin);

export default router;