import { Photos } from "../entities/photos.entity.js";
import { client } from "../util/dbconnection.js";

async function UpdatePhotoById(photo, updatePhoto) {
  return await Photos.put({
    ...photo.data,
    ...updatePhoto,
  }).go();
}

async function deletePhotoById(id) {
  await Photos.delete({ photoId: id }).go();
}

async function getPhotoById(id) {
  return await Photos.get({ photoId: id }).go();
}

async function getAllPhotos() {
  return await Photos.scan.go();
}

async function createPhoto(addPhoto) {
  await Photos.create(addPhoto).go();
}

async function getPhotosByUsername(dbusername) {


  try {
   const filteredPhotos = await Photos.scan.where(({ userName }, { eq }) => eq(userName, dbusername)).go();

    return filteredPhotos.data;
  } catch (error) {
    console.error("Error scanning DynamoDB:", error);
    throw new Error("Failed to retrieve photos");
  }
}

export {
  getAllPhotos,
  getPhotoById,
  UpdatePhotoById,
  deletePhotoById,
  createPhoto,
  getPhotosByUsername,
};
