
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');
const mongoose = require("mongoose");
const path = require("path");




const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("MongoDb connected"));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send("Backend is Working");
});

app.use('/api', UserRoute);
app.use('/blog', BlogRoute);

app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`));