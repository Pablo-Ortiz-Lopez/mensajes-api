import express from 'express'
const router = express.Router();
import Controller from "./users.controller";
import auth from 'src/utils/authMiddleware';

const controller = new Controller();

/* User login */
router.post('/login', controller.login);

/* GET credentials */
router.get('/credentials', auth, controller.credentials);

/* User signup */
router.post('/register', controller.register);

/* User logout */
router.post('/logout',auth, controller.logOut);

export default router;
