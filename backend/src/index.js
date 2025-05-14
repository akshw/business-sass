const express = require("express");
const rootrouter = require("./routes/rootrouter.js");

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
