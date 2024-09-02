import express from "express"
import dotenv from "dotenv"
import cors from "cors"

//App routes
import UploadRoutes from "./routes/upload.mjs"
import StreamRoutes from "./routes/stream.mjs"

const app = express();
dotenv.config();

app.use(express.static('bucket'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ result: "it worked" })
})

app.use("/upload", UploadRoutes)
app.use("/stream", StreamRoutes)

app.listen(8080, () => console.log("listening at port 8080"))