let express = require("express");
let app = express();
let home = require("./Routes/home.js")
let session = require("express-session");
const path = require("path");
var flash = require('connect-flash');

app.use(flash());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(session({secret : "mysupersecretstring"}));

app.get("/test",(req,res)=>{
    let {name = "anonams"} = req.query;
    req.session.nam = name;
    req.flash('info','flash is back');
    res.redirect("/res");    
})

app.get("/res",(req,res)=>{
    let nam = req.session.nam;
    res.locals.message = req.flash('info')
    res.render('indesx.ejs',{nam});
})



app.use("/",home)



app.listen("3000",()=>{
    console.log("app is listing on port 3000")
})