const express=require("express");  //to use express
const bodyParser=require("body-parser");  //json <-> string
const path=require("path")  //to use path.join
const app=express();  //to use express app

const db=require("./config/database");  //to use database
db.authenticate()
.then(()=>console.log("DataBase Connected..."))
.catch((err)=>console.log("ERROR: "+err));

app.use(express.urlencoded({extended:true})) //ASK

app.use(express.json());  //converts requests into json that comes as string

app.set("view-engine","ejs");

app.use(express.static(path.join(__dirname, "public")));  //alows to access static folder which has assets

app.use(bodyParser.json());  //for parsing and getting json objects

app.get('/',(req,res)=>{
    res.render("home.ejs");
})

const userRouter=require("./routes/userRoutes");
app.use("/user/", userRouter);

const adminRouter=require("./routes/adminRoutes");
app.use("/admin/", adminRouter);


app.listen(3000); 