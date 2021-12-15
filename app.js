const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { mongoDbUrl, PORT } = require('./services/config')


const app = express();

mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.", err);
    });


app.use(cors())
app.use(express.static(`${__dirname}/public/Media`))
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(morgan("CMS-NODEJS-UI"))

/* Routes */
const docRoutes = require('./routes/docRoutes')
const modelRoutes = require('./routes/modelRoutes')
const formRoutes = require('./routes/formRoutes')
const searchRoutes = require('./routes/searchRoutes')
const validateRoutes = require('./routes/validateRoutes')
const mediaRoutes = require('./routes/mediaRoutes')

app.use('/docs', docRoutes)
app.use('/model', modelRoutes)
app.use('/form', formRoutes)
app.use('/validate',validateRoutes)
app.use('/search',searchRoutes)
app.use('/media',mediaRoutes)

app.post("/picture",async (req,res) => {
    try{
        console.log('reqqq:',req)
        if(!req.files){
            res.send({
                status :false,
                message: "no such Files"
            })
        }
        else {
            const pictured = req.files.picture
            console.log(pictured)
            pictured.mv(`${__dirname}/public/${pictured.name}`, function (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ msg: "Error occured" });
                }
                // returing the response with file path and name
                return res.send({name: pictured.name, path: `/${pictured.name}`});
            });

            // res.send({
            //     status: true,
            //     message: "file uploaded",
            //     file : `/` + pictured.name
            // })
        }
    } catch (e)
    {
        res.status(500).send(e)
    }
})


/* Start The Server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});