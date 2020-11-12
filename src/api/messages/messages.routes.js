import express from 'express'
const router = express.Router();
import Controller from "./messages.controller";
import auth from 'src/utils/authMiddleware'

const controller = new Controller();

/* GET route for messages */
router.get('/', auth, controller.findAll);

/* POST route for messages */
router.post('/', auth, controller.add);

/* PUT route for messages */
router.put('/', auth, controller.update);

/* DELETE route for messages */
router.delete('/', auth, controller.delete);

export default router;
