const express = require('express');
const mongoose = require("mongoose");
const ModelRouter = require("./routes/Model");

const app = express();

mongoose.connect( `mongodb+srv://user:User%40123@cluster0.m1fvc.mongodb.net/CMS-1?authSource=admin&replicaSet=atlas-116p88-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.", err);
    });

    app.use(express.json());

    app.use("/model", ModelRouter);

    app.listen(5000, () => {
        console.log(`Server is running on Port ${5000}`);
    });