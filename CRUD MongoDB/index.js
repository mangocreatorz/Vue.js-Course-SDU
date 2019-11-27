const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();

Mongoose.connect("mongodb://localhost:27017/mydb");

const PersonModel = Mongoose.model("users", {
    firstname: String,
    lastname: String
});

app.use(BodyParser.json());
//app.use(BodyParser.urlencoded({ extended: true }));

app.post("/create", async (request, response) => {
    try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    try {
        var result = await PersonModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/users/:id", async (request, response) => {
    try {
        var person = await PersonModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Listening at port 3000");
});