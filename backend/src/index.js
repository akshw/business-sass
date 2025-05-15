import express from "express";
import rootrouter from "./routes/rootrouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Health check");
});

app.use("/api", rootrouter);

app.listen(3000, () => {
  console.log("Server up on 3000");
});
