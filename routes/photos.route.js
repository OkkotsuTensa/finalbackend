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


//Both User and admin can perform
router.get("/",  getAllPhotosCtr);
router.get("/:id", getPhotobyIdCtr);

//Only admin can perform
router.delete("/:id" , auth , authIsAdmin,  deletePhotoCtr);
router.post("/", auth , authIsAdmin, createPhotoCtr);
router.put("/:id", auth , authIsAdmin,  updatePhotoCtr);


//UserPerforming Tasks on his data .
router.get('/user/:username', auth, getPhotosByUsernameCtr);
router.post('/user/:username', auth, createPhotoCtr); 
router.put('/user/:username/:id', auth, updatePhotoCtr); 
router.delete('/user/:username/:id', auth, deletePhotoCtr);


export default router;
