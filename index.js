require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require('./database/connectDB');
const RequestLogger = require("./middleware/logger");
const errorhandler = require("./middleware/errorHandler");
const ArticleRoutes = require("./routes/article.routes");

const authRoutes = require("./routes/auth.routes")
const app = express()
const PORT =process.env.PORT ||3007

connectDB();

app.use(express.json())

app.use(cors());

app.get("/", (req, res) => {
    res.send("Api is running...");
});


app.use(RequestLogger);

app.use('/api/auth', authRoutes);
app.use("/api/article", ArticleRoutes)

app.use(errorhandler);



app.listen(PORT, ()=>{
    console.log(`Sever is listening on Port ${PORT}`)
});