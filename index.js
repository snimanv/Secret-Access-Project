import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8000;
// var password = '';
var userAuthenticate = false;

app.use(bodyParser.urlencoded({ extended: true}));

function accessCheck(req, res, next) {
    const password = req.body["password"];
    console.log(req.body);
    if (password === "^Tech123!") {
        userAuthenticate = true;
    };
    next();
};

app.use(accessCheck);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
    if (userAuthenticate) {
        res.sendFile(__dirname + "/public/access.html");
    }
    else {
        //res.sendFile(__dirname + "/public/index.html.html");
        res.redirect("/");
    }
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});