import express, { response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Photos } from "../entities/photos.entity.js";
import { authIsAdmin } from "../middlewares/isadmin.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  getAllPhotosCtr,
  getPhotobyIdCtr,
  deletePhotoCtr,
  createPhotoCtr,
  updatePhotoCtr,
  getPhotosByUsernameCtr ,
} from "../controllers/photos.controller.js";

const router = express.Router();




//Only admin can perform
// router.delete("/:id" , auth , authIsAdmin,  deletePhotoCtr);
// router.post("/", auth , authIsAdmin, createPhotoCtr);
// router.put("/:id", auth , authIsAdmin,  updatePhotoCtr);


//UserPerforming Tasks on his data .
router.get('/myphotos', auth, getPhotosByUsernameCtr);
router.post('/myphotos', auth, createPhotoCtr); 
router.put('/:id', auth, updatePhotoCtr); 
router.delete('/:id', auth, deletePhotoCtr);

//Both User and admin can perform
router.get("/",  getAllPhotosCtr);
router.get("/:id", getPhotobyIdCtr);


export default router;
