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
    username:"ognigga",
    password:"stfu",
}

async function initializeDB() {
    try {
        await client.connect();
        db = client.db('Dtabase');
        collection = db.collection("Cred");
        await collection.insertOne(DefaultUser);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

initializeDB();
app.post("/CheckCred", async (req, res) => {
    const { username, password } = req.body || {};

    if (username === DefaultUser.username && password === DefaultUser.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT,()=>
{
    console.log(`Server is running on port ${PORT}`);
});




