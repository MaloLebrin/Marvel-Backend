const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(formidableMiddleware({
    multiples: true,
}));

mongoose.connect("mongodb://localhost:27017/Marvel-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
const charactersRoutes = require("./routes/characters");
const userRoutes = require("./routes/user");
// const searchRoutes = require("./routes/search");
app.use(charactersRoutes);
app.use(userRoutes);
// app.use(searchRoutes);


app.all("*", (req, res) => {
    res.status(404).json({ error: "Page not found app.all" });
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started at ${process.env.PORT}`);
});
