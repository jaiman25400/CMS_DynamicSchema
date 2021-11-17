const express = require('express');
const mongoose = require("mongoose");
const ModelRouter = require("./routes/Model");
const docRoutes = require('./routes/docRoutes')

const app = express();

mongoose.connect( "mongodb+srv://Jaiman25:Jaiman%407567@cluster0.cbkdf.mongodb.net/test", { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.", err);
    });

    app.use(express.json());

    app.use('/docs', docRoutes)
    app.use("/model", ModelRouter);

    app.listen(5000, () => {
        console.log(`Server is running on Port ${5000}`);
    });