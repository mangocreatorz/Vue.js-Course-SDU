const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

 

const urlencodedParser = bodyParser.urlencoded({extended: false});
 
app.get("/message/create", urlencodedParser, function (request, response) {
    response.render('form.ejs')
});
app.post("/message/create", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
   
    response.render('app.ejs', {
        name: request.body.userName,
        surname: request.body.userSur
    })
});

 


app.listen(3000, function(){
    console.log('listening on 3000')
})