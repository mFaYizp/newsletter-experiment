const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html"); 
})

app.post("/", function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.mail;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
                
            }
        ]
    };
    const jsonData = JSON.stringify(data)
    const url = "https://us21.admin.mailchimp.com/lists/e2885e5b8a"

    const options = {
        method: "POST",
        auth: "FaYizp:e45fa02e73cf336991ec53166512c25c-us21"
    }
    
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
    
})












app.listen(3000, function(){
    console.log("server is running on PORT 3000")
})
// API KEY
// e45fa02e73cf336991ec53166512c25c-us21
//List ID
// e2885e5b8a