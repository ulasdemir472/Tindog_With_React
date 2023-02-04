const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const uri = process.env.URI;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello to my app");
});

app.post("/register", async (req, res) => {
  const client = new MongoClient(uri);

  const user = req.body.user;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(user.password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // const user_email = { email: user.email };
    // const existingUser = users.findOne(user_email);
    // if (existingUser) {
    //   return res.status(409).send("User already exists.Please login.");
    // }

    const sanitizedEmail = user.email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      gender: user.gender,
      image: user.image,
      bio: user.bio,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/registerDog", async (req, res) => {
  const client = new MongoClient(uri);

  const dog = req.body.dog;

  const generatedDogId = uuidv4();

  try {
    await client.connect();
    const database = client.db("app-data");
    const dogs = database.collection("dogs");

    const data = {
      dog_id: generatedDogId,
      name: dog.name,
      type: dog.type,
      age: dog.age,
      gender: dog.gender,
      image: dog.image,
      user_id: dog.user_id,
    };

    await dogs.insertOne(data);

    res.status(201).json({ dogId: generatedDogId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.get("/dogs", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const dogs = database.collection("dogs");

    const returnedDogs = await dogs.find().toArray();
    res.send(returnedDogs);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
