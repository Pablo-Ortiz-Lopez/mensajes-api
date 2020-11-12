import express from 'express'
const router = express.Router();
import Controller from "./messages.controller";

const controller = new Controller();

/* GET route for messages */
router.get('/', controller.findAll);

/* POST route for messages */
router.post('/', controller.add);

/* PUT route for messages */
router.put('/', controller.update);

/* DELETE route for messages */
router.delete('/', controller.delete);

export default router;
