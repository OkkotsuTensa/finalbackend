import jwt from "jsonwebtoken";
import { Session } from "../entities/session.entity.js";
import { Users } from "../entities/users.entity.js";
// middleware are function

const ADMIN = 0;

const authIsAdmin = async (request, response, next) => {
  const token = request.header("x-auth-token");
  try {
    // jwt.verify(token, process.env.SECRET_KEY);
    const results = await Session.get({ token: token }).go();
    const role = await Users.get({ userName: results.data.userName }).go();
    console.log(results, role);

    if (role.data.roleId === ADMIN) {
      next();
    } else {
      throw new Error("Unauthorized");
    }
    // next();
  } catch (err) {
    response.status(401).send({ msg: err.message });
  }
};

export { authIsAdmin };
