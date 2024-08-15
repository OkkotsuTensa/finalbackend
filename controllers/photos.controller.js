import { v4 } from "uuid";

import {
  getAllPhotos,
  getPhotoById,
  UpdatePhotoById,
  deletePhotoById,
  createPhoto,
} from "../services/photos.services.js";

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
  // console.log(movie.data);
  try {
    const photo = await getPhotoById(id);
    console.log(photo);
    photo.data
      ? response.send(photo.data)
      : response.status(404).send({ msg: "Movie not found" });
  } catch (err) {
    console.log(err)
    response.status(500).send({ msg: "failed to retrieve" });
  }
}

async function deletePhotoCtr(request, response) {
  const { id } = request.params;

  try {
    const photo = await getPhotoById(id);
    if (photo.data) {
      // const mid = movies.indexOf(movie);
      // movies.splice(mid, 1);
      await deletePhotoById(id);
      response.send({ msg: "Movie deleted 🎉" });
    } else {
      response.status(404).send({ msg: "there is No such Movie 🥲" });
    }
  } catch (err) {
    console.log(err)
    response.status(500).send({ msg: "Failed to Perform delete" });
  }
}

async function createPhotoCtr(req, res) {
  const data = req.body;
  const addPhoto = {
    ...data,
    photoId: v4(),
  };
  try {
    await createPhoto(addPhoto);
    res.status(201).send(addPhoto);
  } catch (err) {
    console.log(err);
    res.send({ msg: "unable to create" });
  }
}

async function updatePhotoCtr(request, response) {
  const { id } = request.params;
  const updatePhoto = request.body;
  try {
    const photo = await getPhotoById(id);
    if (photo.data) {
      const mergedData = await UpdatePhotoById(photo, updatePhoto);
      console.log("updated..");
      response.send(mergedData.data);
    } else {
      response.status(404).send("No such Movie 🥲");
    }
  } catch (err) {
    console.log(err)
    response.status(500).send({ msg: "Movie not found" });
  }
}

export {
  getAllPhotosCtr,
  deletePhotoCtr,
  createPhotoCtr,
  updatePhotoCtr,
  getPhotobyIdCtr,
};
