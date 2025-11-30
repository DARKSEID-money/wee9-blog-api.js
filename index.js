require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require('./database/connectDB');
const RequestLogger = require("./middleware/logger")
const errorhandler = require("./middleware/errorHandler")
const ArticleRoutes = require("./routes/article.routes");

const app = express()
const PORT = process.env.PORT

connectDB();

app.use(express.json())

app.use(cors("*"));


app.use(RequestLogger);

app.use(ArticleRoutes);

app.use(errorhandler);

app.listen(PORT, ()=>{
    console.log(`Sever is listening on Port ${PORT}`)
});