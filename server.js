var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

//Allows what kind of data the server can read from the body. Converts the users input data into JSON-format to be able to read it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.Promise =
    global.Promise;

mongoose.connect("mongodb://testperson:test123@ds221003.mlab.com:21003/cleandb");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var User = mongoose.model("User", nameSchema);

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
            console.log("Posted data.");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//The port the server is listening to.
app.listen(port, () => {
    console.log("Server listening on port " + port);
});


