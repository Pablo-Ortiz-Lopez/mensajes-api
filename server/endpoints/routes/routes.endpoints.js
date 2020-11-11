import express from 'express'
import {Validator} from "jsonschema";
import request from './route.request.json'
const jsonSchema = new Validator();
const router = express.Router();
import {getRoute} from "./routes.model";

/* GET route for startPoint */
router.get('/',  async function(req, res, next) {
  if(!jsonSchema.validate(req.body,request).valid){
    res.status(400).send("Bad request");
    return
  }
  const {error,route} = await getRoute(req.body)
  if(error){
    res.status(error.code).send(error.message);
  }else{
    res.status(200).send(route);
  }
});

export default router;
