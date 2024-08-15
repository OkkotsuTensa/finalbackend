import { Photos } from "../entities/photos.entity.js";

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

export {
  getAllPhotos,
  getPhotoById,
  UpdatePhotoById,
  deletePhotoById,
  createPhoto,
};
