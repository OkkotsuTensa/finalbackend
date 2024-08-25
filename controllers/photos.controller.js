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
import { Users } from "../entities/users.entity.js";

const ADMIN = '0'

async function getPhotosByUsernameCtr(request, res) {
  const token = request.header("x-auth-token"); // Retrieve the photo by ID
  const session = await Session.get({ token: token }).go();
  const username = session.data.userName;
  console.log("❤️❤️❤️", username)
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
  const { id } = request.params; // Get username and photo ID from the URL parameters

  try {
    const photo = await getPhotoById(id);
    const token = request.header("x-auth-token"); // Retrieve the photo by ID
    const session = await Session.get({ token: token }).go();
    const username = session.data.userName;
    const user = await Users.get({ userName: username }).go();
    const roleid = user.data.roleId;
    console.log(roleid)

    if (photo.data && (photo.data.userName === username || roleid == ADMIN)) { // Check if the photo belongs to the user
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
  // const { username } = req.params; // Get username from the URL parameters
  const data = req.body;
  console.log(data)


  try {
    const createdAt = new Date().toISOString();
    const token = req.header("x-auth-token"); // Retrieve the photo by ID
    const session = await Session.get({ token: token }).go();
    const username = session.data.userName;

    const addPhoto = {
      ...data,
      photoId: v4(),
      userName: username,
      createdAt: createdAt
    };

    console.log("❤️❤️", data, addPhoto)

    await createPhoto(addPhoto);
    res.status(201).send(addPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Unable to create photo" });
  }
}


// Update a specific photo for a user
async function updatePhotoCtr(request, response) {
  const { id } = request.params; // Get username and photo ID from the URL parameters

  const updateData = request.body;
  // console.log(username , id , updateData) 

  try {
    const photo = await getPhotoById(id); // Retrieve the photo by ID
    const token = request.header("x-auth-token"); // Retrieve the photo by ID
    const session = await Session.get({ token: token }).go();
    const username = session.data.userName;
    const user = await Users.get({ userName: username }).go();
    const roleid = user.data.roleId;


    if (photo.data && (photo.data.userName === username || roleid == ADMIN)) { // Check if the photo belongs to the user
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
  getPhotosByUsernameCtr,
};
