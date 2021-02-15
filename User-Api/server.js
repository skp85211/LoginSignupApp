var express = require("express")
var app = express()

//for hashing
//var md5 = require("md5")
//body-parser will try to parse the body content (encoded URL or JSON) of POST req
let bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

var db = require("./User_Db.js")

var HTTP_PORT = 8000
app.listen(HTTP_PORT, ()=>{
    console.log("Server running on port number : %PORT%".replace("%PORT%",HTTP_PORT))
})

app.get("/", (req,res) => {
    res.json({"message":"Response -> Ok"})
});


//list all users in Database

app.get("/list/user", (req, res) => {
    let sql = "SELECT * FROM user"
    db.all(sql, (err, rows) => {
        if(err){
            res.status(400).json({"Error : " : err.message});
            return;
        }
        res.json({
            "message : " : "Success",
            "data":rows 
        })
    });
});


//login
/*
app.get("/user/login/:email/:password", (req, res) => {
    let sql = "SELECT * FROM user WHERE email = ? AND password = ?"
    let params = [req.params.email, req.params.password]
    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({"Error " : err.message});
            return;
        }
        if(row){
            res.json({
                "Message " : "Authorised Successfully",
                "data":row
            })
        }
        else{
            res.json({
                "Message " : "Wrong email or password",
                "TODO" : "If new user signup using user/signup"
            })
        }
    });
});
*/

//for login

app.post("/user/login/", (req, res) => {
    let sql = "SELECT * FROM user WHERE email = ? AND password = ?"
    let errors=[]
    if(!req.body.password){
        errors.push("There is no password to add")
    }
    if(!req.body.email){
        errors.push("There is no email to add")
    }
    if(errors.length){
        res.status(400).json({"error " : errors.join(",")});
        return;
    }

    let params = [req.body.email, req.body.password]
    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({"Error " : err.message});
            return;
        }
        if(row){
            res.json({
                "Message " : "Authorised Successfully",
                "data":row
            })
        }
        else{
            res.json({
                "Message " : "Wrong email or password",
                "TODO" : "New user? signup using /user/signup"
            })
        }
    });
});

//for signup

app.post("/user/signup/", (req, res) => {
    let errors=[]
    if(!req.body.password){
        errors.push("There is no password to add")
    }
    if(!req.body.email){
        errors.push("There is no email to add")
    }
    if(errors.length){
        res.status(400).json({"error " : errors.join(",")});
        return;
    }

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    let sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]

    db.run(sql, params, (err,result) => {
        if(err){
            res.status(400).json({"error : " : err.message, "TODO : " : "Already a user? login using /user/login"})
            return;
        }
        res.json({
            "message : " : "Success",
            "data": data
        })
    });
});

app.use(function(req, res) {
    res.status(404);
});