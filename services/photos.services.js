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
  return await Photos.get({ photoId : id }).go();
}

async function getAllPhotos() {
  return await Photos.scan.go();
}

async function createPhoto(addPhoto) {
  await Photos.create(addPhoto).go();
}

async function getPhotosByUsername(username) {
  const params = {
      TableName: "Photos", // Replace with your actual table name
      FilterExpression: "userName = :username",
      ExpressionAttributeValues: {
          ":username": username,
      },
  };

  try {
      const result = await client.scan(params).promise();
      
      // Map through the result to extract only the desired fields
      const filteredPhotos = result.Items.map(photo => ({
          userName: photo.userName,
          createdAt: photo.createdAt,
          photoId: photo.photoId,
          description: photo.description,
          url: photo.url,
          type: photo.type
      }));

      return filteredPhotos; // Returns an array of objects with the specified fields
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
  getPhotosByUsername ,
};
