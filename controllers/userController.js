const User = require("../models/User"); //import the user table here   //This model will be used to create objects in post method
const db = require("../config/database"); //to import config file
const bcrypt = require("bcrypt");

exports.login = async function (req, res) {
  res.render("user_login.ejs", { message: "" });
};

exports.signin = async (req, res) => {
  var det = req.body;
  let query = `SELECT id,password FROM Users WHERE Email='${det.email}'`;
  var [results] = await db.query(query);
  console.log(results);
  if (bcrypt.compareSync(det.password, results[0].password))
    res.redirect("/user/booking/" + results[0].id);
  else res.render("user_login.ejs", { message: "Wrong Crenditials" });
};

exports.booking = async (req, res) => {
  var id = req.params.id;
  let query1 = `SELECT b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE u.id=${id} and u.id=b.user_id and b.place_id=p.id and b.service_id=s.id order by booking_date asc`;
  const [result] = await db.query(query1);
  res.render("user_booking.ejs", { bookings: result, id });
};

exports.sign_up = async (req, res) => {
  res.render("user_signup.ejs");
};

exports.register = async (req, res) => {
  var det = req.body;
  var hashed = bcrypt.hashSync(det.password, 10);
  let query = `INSERT into users(Name,Email,Password,Contact_No,Address,Role) VALUES('${det.name}','${det.email}','${hashed}','${det.contact}','${det.address}','user')`;
  await db.query(query);
  res.redirect("/user/login");
};

exports.logout = async (req, res) => {
  res.redirect("/");
};

exports.render_add_booking = async (req, res) => {
  let query1 = `SELECT city FROM Places`;
  const [result1] = await db.query(query1);
  let query2 = `SELECT * FROM Services order by Service_name asc`;
  const [result2] = await db.query(query2);
  res.render("user_add_booking.ejs", {
    selected_city: "",
    selected_date: "select date",
    city: result1,
    services: result2,
    id: req.params.id,
    message: "",
    dis: "hidden_ele",
  });
};

exports.check_availability = async (req, res) => {
  let query = `SELECT count(*) FROM Bookings b,Places p WHERE b.place_id=p.id and p.city='${req.body.city}' and b.booking_date='${req.body.date}' and b.status='Accepted'`;
  const [result] = await db.query(query);
  console.log(result[0]["count(*)"]);
  let query1 = `SELECT city FROM Places`;
  const [result1] = await db.query(query1);
  let query2 = `SELECT * FROM Services`;
  const [result2] = await db.query(query2);
  if (result[0]["count(*)"] < 5)
    res.render("user_add_booking.ejs", {
      selected_city: req.body.city,
      selected_date: req.body.date,
      services: result2,
      id: req.params.id,
      city: result1,
      message: "Slots are Available",
      dis: "nhidden_ele",
    });
  else
    res.render("user_add_booking.ejs", {
      selected_city: "",
      selected_date: "select date",
      services: result2,
      id: req.params.id,
      city: result1,
      message: "Slots aren't Available choose different date or place",
      dis: "hidden_ele",
    });
};

exports.add_booking = async (req, res) => {
  var det = req.body;
  let query1 = `SELECT id FROM Places WHERE city='${req.body.city}'`;
  const [result1] = await db.query(query1);
  console.log(result1);
  let query2 = `SELECT id FROM Services WHERE service_name='${req.body.service}'`;
  const [result2] = await db.query(query2);
  // console.log(result2)
  let query3 = `insert into bookings (User_Id,Booking_Date,Vehicle_Number,Status,Place_Id,Service_Id) VALUES(${req.params.id},'${det.date}','${det.vehicle_no}','Pending',${result1[0].id},${result2[0].id})`;
  await db.query(query3);
  res.redirect("/user/booking/" + req.params.id);
};
