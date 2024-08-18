import { Users } from "../entities/users.entity.js";
import { Session } from "../entities/session.entity.js";

async function createUser(user) {
  await Users.create(user).go();
}

async function getUserByUsername(username) {
  try {
    return await Users.get({ userName: username }).go();
  } catch (error) {
    console.error("Error retrieving user by username:", error);
    throw new Error("Failed to retrieve user");
  }
}
async function createSession(sessionData) {
  return await Session.create(sessionData).go();
}

export { createUser, getUserByUsername, createSession };
