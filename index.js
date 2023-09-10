import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://127.0.0.1:27017/personal_branding", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Api Connected")
})

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});