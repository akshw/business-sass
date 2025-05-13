import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Health check");
});

//todo - implement zod-validation, JWT - auth

app.post("/api/v1/signup/otp", async (req, res) => {});

app.post("/api/v1/register", async (req, res) => {
  console.log(req.body);
  const {
    email,
    phone_no,
    name,
    business_name,
    business_type,
    business_details,
  } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
      phone_no,
      name,
      business_name,
      business_type,
      business_details,
    },
  });
  res.json(newUser);
  console.log("User registered");
});

app.get("/api/v1/home", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.json({
      message: "Authorization failed",
    });
  }
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      shared,
    },
  });
  res.send(data);
});

app.get("/api/v1/profile", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.json({
      message: "Authorization failed",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      phone_no: true,
      name: true,
      business_name: true,
      business_type: true,
      business_details: true,
      images: true,
      videos: true,
      shared: true,
    },
  });
  res.json(user);
  console.log("user fetched");
});

app.put("/api/v1/update", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.json({
      message: "Authorization failed",
    });
  }
  const {
    email,
    phone_no,
    name,
    business_name,
    business_type,
    business_details,
  } = req.body;
  const updated_user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      phone_no,
      name,
      business_name,
      business_type,
      business_details,
      images,
      videos,
    },
  });
  res.send(updated_user);
});

app.post("/api/v1/share", async (req, res) => {});

app.listen(3000, () => {
  console.log("Server up on 3000");
});
