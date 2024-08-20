import { v4 } from "uuid";

import {
  getAllPhotos,
  getPhotoById,
  UpdatePhotoById,
  deletePhotoById,
  createPhoto,
  getPhotosByUsername
} from "../services/photos.services.js";
import { Session } from "../entities/session.entity.js";


async function getPhotosByUsernameCtr(req, res) {
  const { username } = req.params; // Extract username from request parameters
  console.log(username)
  try {
      const photos = await getPhotosByUsername(username);
      console.log(photos)
      res.status(200).send(photos); // Send the photos data as response
  } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "Failed to retrieve photos" });
  }
}

async function getAllPhotosCtr(request, response) {
  // response.send(movies);
  try {
    const allPhotos = await getAllPhotos();
    response.status(200).send(allPhotos.data);
  } catch (err) {
    console.log(err);
    response.status(500).send({ msg: " Couldn't get what you wanted " });
  }
}

async function getPhotobyIdCtr(request, response) {
  const { id } = request.params;
  console.log(id)
  // console.log(movie.data);
  try {
    const photo = await getPhotoById(id);
    console.log(photo);
    photo.data
      ? response.send(photo.data)
      : response.status(404).send({ msg: "Photo not found" });
  } catch (err) {
    console.log(err)
    response.status(500).send({ msg: "failed to retrieve" });
  }
}
// Delete a specific photo for a user
async function deletePhotoCtr(request, response) {
  const {id } = request.params; // Get username and photo ID from the URL parameters

  try {
    const photo = await getPhotoById(id);
    const token = request.header("x-auth-token"); // Retrieve the photo by ID
    const session  = await Session.get({token : token}).go() ; 
    const username = session.data.userName ;

    if (photo.data && photo.data.userName === username) { // Check if the photo belongs to the user
      await deletePhotoById(id); // Delete the photo
      response.send({ msg: "Photo deleted successfully" });
    } else {
      response.status(404).send({ msg: "Photo not found or does not belong to the user" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).send({ msg: "Failed to delete photo" });
  }
}
// Create a new photo for a specific user
async function createPhotoCtr(req, res) {
  const { username } = req.params; // Get username from the URL parameters
  const data = req.body;
  console.log(username , data)

  try {
    const addPhoto = {
      ...data,
      photoId: v4(),
      userName: username || "admin", // Set the userName to the specified username
    };

    await createPhoto(addPhoto);
    res.status(201).send(addPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Unable to create photo" });
  }
}


// Update a specific photo for a user
async function updatePhotoCtr(request, response) {
  const { username, id } = request.params; // Get username and photo ID from the URL parameters
  
  const updateData = request.body;
  console.log(username , id , updateData) 

  try {
    const photo = await getPhotoById(id); // Retrieve the photo by ID
    console.log(photo)
    if (photo.data && photo.data.userName === username || "admin") { // Check if the photo belongs to the user
      const updatedPhoto = await UpdatePhotoById(photo, updateData);
      console.log(updateData)
      response.send(updatedPhoto.data);
    } else {
      response.status(404).send({ msg: "Photo not found or does not belong to the user" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).send({ msg: "Failed to update photo" });
  }
}
export {
  getAllPhotosCtr,
  deletePhotoCtr,
  createPhotoCtr,
  updatePhotoCtr,
  getPhotobyIdCtr,
  getPhotosByUsernameCtr ,
};
