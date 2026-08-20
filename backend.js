const express= require('express');
const mongo= require('mongodb');
const bcrypt = require('bcrypt');
const app= express();

app.use(express.json());
app.use(express.static(__dirname));

const {MongoClient,ObjectId} =require('mongodb');
const url="mongodb://localhost:27017";
const client =new MongoClient(url);

const PORT=3000;
let collection;
let db;

const DefaultUser={
    fullname:"default",
    email:"default@example.com",
    username:"ognigga",
    password:"stfu",
}

async function initializeDB() {
    try {
        await client.connect();
        db = client.db('Dtabase');
        collection = db.collection("Cred");

        const existing = await collection.findOne({
            username: DefaultUser.username,
            password: DefaultUser.password
        });

        if (!existing) {
            await collection.insertOne(DefaultUser);
        }

        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

const databaseReady = initializeDB();

app.post("/CheckCred", async (req, res) => 
{
    try {
        await databaseReady;
        const { username, password } = req.body || {};

        const user = await collection.findOne({ username, password });

        res.json({ success: Boolean(user) });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Unable to log in" });
    }
});

app.post("/register", async (req, res) =>
{
    try {
        await databaseReady;
        const { fullname, username, password, email } = req.body || {};

        if (!fullname || !username || !password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await collection.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        await collection.insertOne({ fullname, username, password, email });
        res.json({ success: true });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ success: false, message: "Error occurred while registering user" });
    }
});



app.listen(PORT,()=>
{
    console.log(`Server is running on port ${PORT}`);
});





