import jwt from "jsonwebtoken";
import { Session } from "../entities/session.entity.js";


const auth = async (request, response, next) => {
  const token = request.header("x-auth-token");
  try {
    jwt.verify(token, process.env.SECRET_KEY);

    const session = await Session.get({token: token}).go()
    // session.data?.userName == param
    next();
  } catch (err) {
    response.status(401).send({ msg: err.message });
  }
};

export { auth };
