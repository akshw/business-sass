const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("v1 home");
});

router.post("/api/v1/signup/otp", async (req, res) => {});

//todo - implement zod-validation, JWT - auth

router.post("/api/v1/register", async (req, res) => {
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

router.get("/api/v1/home", async (req, res) => {
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

router.get("/api/v1/profile", async (req, res) => {
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

router.put("/api/v1/update", async (req, res) => {
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
  res.status(201).send(updated_user);
});

router.post("/api/v1/share", async (req, res) => {});

module.export = router;
