import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./src/routes/router.js";

const app = express();
const port = process.env.PORT || 5000;

// YqzBKvNdz14GhIpP
// mongoose.connect("mongodb://127.0.0.1:27017/personal_branding", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const url =
  "mongodb+srv://jovangithub:YqzBKvNdz14GhIpP@personal.cl2jypz.mongodb.net/personal_branding?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Api Connected");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
