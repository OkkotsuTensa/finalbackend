import { Users  } from "../entities/users.entity.js";
import { Session } from "../entities/session.entity.js";

async function createUser(user) {
  await Users.create(user).go();
}
async function getUserByuserName(username) {
  return await Users.get({ userName: username }).go();
}

async function createSession(sessionData) {
  return await Session.create(sessionData).go();
}

export { createUser, getUserByuserName , createSession};
