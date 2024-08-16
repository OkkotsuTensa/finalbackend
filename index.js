import express from "express";
import cors from "cors";
import photosRouter from "./routes/photos.route.js";
import usersRouter from "./routes/users.route.js";

const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

console.log("hi");

app.get("/", function (request, response) {
  response.send("Hello 🙋, 🌏 🎊✨🤩");
});

app.use("/photos", photosRouter);
app.use("/user", usersRouter);
// app.use("/myphotos" ,myphotosRouter) ; 

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
