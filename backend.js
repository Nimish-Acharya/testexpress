const express= require('express');
const mongo= require('mongodb');
const bcrypt = require('bcrypt');
const app= express();

app.use(express.json());
app.use(express.static(__dirname));



