const User = require("../models/User"); //import the user table here   //This model will be used to create objects in post method
const bcrypt = require("bcrypt");
const db = require("../config/database"); //to import config file

exports.view = async function (req, res) {
    res.render("admin_login.ejs", { message: "" });
};

exports.booking = async (req, res) => {
    let query1 = `SELECT b.id,u.Name,u.contact_no,b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE b.status='pending' and b.user_id=u.id and b.place_id=p.id and b.service_id=s.id`;
    const [result1] = await db.query(query1);
    let query2 = `SELECT b.id,u.Name,u.contact_no,b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE b.status='Accepted' and b.user_id=u.id and b.place_id=p.id and b.service_id=s.id`;
    const [result2] = await db.query(query2);
    res.render("admin_home.ejs", {
        pending: result1,
        bookings: result2,
        id: req.params.id,
    });
};

exports.login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    let query = `SELECT id,password FROM Users WHERE Email='${email}' and role='admin'`;
    var [results] = await db.query(query);
    console.log(results);
    if (results[0] && bcrypt.compareSync(password, results[0].password))
        res.redirect("/admin/booking/" + results[0].id);
    else res.render("admin_login.ejs", { message: "Wrong Credentials" });
};

exports.accept = async (req, res) => {
    var bid = req.params.bid;
    console.log(bid);
    let query = `UPDATE Bookings SET status='Accepted' WHERE id=${bid}`;
    await db.query(query);
    res.redirect("/admin/booking/" + req.params.id);
};

exports.reject = async (req, res) => {
    var bid = req.params.bid;
    let query = `UPDATE Bookings SET status='Rejected' WHERE id=${bid}`;
    await db.query(query);
    res.redirect("/admin/booking/" + req.params.id);
};

exports.search_filter = async (req, res) => {
    var place = req.body.place;
    var date = req.body.date;
    console.log(req.params.id);
    let query1 = `SELECT b.id,u.Name,u.contact_no,b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE b.status='pending' and b.user_id=u.id and b.place_id=p.id and b.service_id=s.id`;
    var [result1] = await db.query(query1);
    if (place != "" && date != "") {
        let query2 = `SELECT b.id,u.Name,u.contact_no,b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE b.status='Accepted' and b.booking_date='${date}' and p.city='${place}' and b.user_id=u.id and b.place_id=p.id and b.service_id=s.id`;
        const [result2] = await db.query(query2);
        res.render("admin_home.ejs", {
            pending: result1,
            bookings: result2,
            id: req.params.id,
        });
    } else if (place != "") {
        let query2 = `SELECT b.id,u.Name,u.contact_no,b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE b.status='Accepted' and p.city='${place}' and b.user_id=u.id and b.place_id=p.id and b.service_id=s.id`;
        const [result2] = await db.query(query2);
        res.render("admin_home.ejs", {
            pending: result1,
            bookings: result2,
            id: req.params.id,
        });
    } else if (date != "") {
        let query2 = `SELECT b.id,u.Name,u.contact_no,b.booking_date,p.city,s.service_name,b.status FROM Bookings b,Places p,Services s,Users u WHERE b.status='Accepted' and b.booking_date='${date}' and b.user_id=u.id and b.place_id=p.id and b.service_id=s.id`;
        const [result2] = await db.query(query2);
        res.render("admin_home.ejs", {
            pending: result1,
            bookings: result2,
            id: req.params.id,
        });
    }
};

exports.reset_filter = async (req, res) => {
    res.redirect("/admin/booking/" + req.params.id);
};

exports.places = async (req, res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM Places`;
    const [results] = await db.query(query);
    res.render("admin_places.ejs", { places: results, id: req.params.id });
};

exports.add_place = async (req, res) => {
    var det = req.body;
    let query = `INSERT INTO Places (City,State) VALUES('${det.city}','${det.state}')`;
    await db.query(query);
    res.redirect("/admin/places/" + req.params.id);
};

exports.services = async (req, res) => {
    let query = `SELECT * FROM Services`;
    const [results] = await db.query(query);
    console.log(results);
    res.render("admin_services.ejs", { services: results, id: req.params.id });
};

exports.add_service = async (req, res) => {
    var det = req.body;
    console.log(det);
    let query = `INSERT INTO Services (Service_Name,Cost) VALUES('${det.service_name}','${det.cost}')`;
    await db.query(query);
    res.redirect("/admin/services/" + req.params.id);
};

exports.logout = async (req, res) => {
    res.redirect("/");
};
