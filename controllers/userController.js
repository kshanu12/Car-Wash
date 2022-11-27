const User = require("../models/User"); //import the user table here   //This model will be used to create objects in post method
const db = require("../config/database"); //to import config file
const bcrypt=require("bcrypt");

exports.login = async function (req, res) {
  res.render("user_login.ejs",{message:""});
};

exports.signin = async (req,res)=>{
  var det=req.body;
  let query=`SELECT id,password FROM Users WHERE Email='${det.email}'`;
  var [results] = await db.query(query);
  if(bcrypt.compareSync(det.password,results[0].password))
  {
    res.redirect("/user/booking/"+results[0].id);
  }
  else
    res.render("user_login.ejs",{message:"Wrong Crenditials"})
}

exports.booking=async (req,res)=>{
  var id=req.params.id;
  let query1=`SELECT b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE u.id=${id} and u.id=b.user_id and b.place_id=p.id and b.service_id=s.id`
  const [result]=await db.query(query1);
  console.log(result);
  res.render("user_booking.ejs",{bookings:result,id})
}

exports.sign_up=async (req,res)=>{
  res.render("user_signup.ejs");
}

exports.register = async (req,res)=>{
  var det=req.body;

  var hashed=bcrypt.hashSync(det.password,10);

  let query=`INSERT into users(Name,Email,Password,Contact_No,Address,Role) VALUES('${det.name}','${det.email}','${hashed}','${det.contact}','${det.address}','user')`;
  await db.query(query);

  res.redirect("/user/login");
}

exports.logout = async (req,res) => {
  res.redirect("/"); 
}

exports.render_add_booking = async (req,res)=>{
  // console.log(req.params.id)
  let query1=`SELECT city FROM Places`;
  const [result1]=await db.query(query1);
  // console.log(result1);
  let query2=`SELECT service_name FROM Services`;
  const [result2]=await db.query(query2);
  // console.log(result2);
  
  res.render("user_add_booking.ejs",{city:result1,services:result2,id:req.params.id});
}

exports.add_booking = async (req,res)=>{
  var det=req.body;
  let query1=`SELECT id FROM Places WHERE city='${req.body.city}'`;
  const [result1]=await db.query(query1);
  console.log(result1);
  let query2=`SELECT id FROM Services WHERE service_name='${req.body.service}'`;
  const [result2]=await db.query(query2);

  let query3=`insert into bookings (User_Id,Booking_Date,Vehicle_Number,Status,Place_Id,Service_Id) VALUES(${req.params.id},'${det.date}','${det.vehicle_no}','Pending',${result1[0].id},${result2[0].id})`;
  await db.query(query3);

  res.redirect("/user/booking/"+req.params.id);

}

















// exports.form = (req, res) => {
//   res.render("us_sign_up.ejs");
// };

// exports.post = async (req, res) => {
//   try {
//     // USING NODE SEQUELIZE -------------------------------------------------------->

//     // User.create({
//     //   //{see the first line user}
//     //   u_name: req.body.name, //req.body.(check in the form attribute name of name)
//     //   email: req.body.email, //req.body.(check in the form attribute name of email)
//     //   age: req.body.age,
//     //   mobile: req.body.mobile,
//     // });

//     // USING SQL QUERY -------------------------------------------------------------->

//     let query = `INSERT INTO table1s(u_name,email,age,mobile) VALUES('${req.body.name}' , '${req.body.email}' , ${req.body.age} , '${req.body.mobile}')`;
//     await db.query(query);

//     res.redirect("/user/"); //if you use redirect it must be handled in api or else use render
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.ulhelp = (req, res) => {
//   res.render("us_sign_up_help.ejs");
// };

// exports.deleteUser = async (req, res) => {
//   //USING NODE?EXPRESS----------->

//   // let userid = req.params.id;
//   // await User.destroy({
//   //   where:{
//   //     u_id:userid
//   //   }
//   // });

//   // USING SQL QUERY------------->

//   let query = `DELETE FROM table1s WHERE u_id=${req.params.id}`;              
//   await db.query(query);

//   res.redirect("/user/");
// };

// exports.redirectUpdatePage = async (req, res) => {
//   // console.log(req.params.id);
//   res.render("us_update_form.ejs", { val: req.params.id });       //we are sending this to frontend so that accessing the id can make post req
// };

// exports.updateUser = async (req, res) => {
//   // USING NODE?EXPRESS----------->

//   // await User.update({u_name : req.body.name ,email : req.body.email, age : req.body.age , mobile : req.body.mobile},{
//   //   where:{
//   //     u_id : req.params.id,
//   //   }
//   // })

//   // USING SQL QUERY------------->

//   let query = `UPDATE table1s SET u_name = '${req.body.name}' , email = '${req.body.email}' , age = ${req.body.age} , mobile = '${req.body.mobile}' WHERE u_id=${req.params.id}`;
//   await db.query(query);

//   res.redirect("/user/");
// };

// exports.searchUser = async (req, res) => {
//   console.log(req.body.search);
//   let query = `SELECT * FROM table1s WHERE u_name LIKE "%${req.body.search}%"`; 
//   const [results] = await db.query(query);
//   console.log(results);
//   res.render("us_searched_list.ejs", { project: results }); //This project will contain rows which will dynamically shown in home.ejs
// };