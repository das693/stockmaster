// const express=require('express');
var express = require('express');
var bodyParser = require('body-parser');
// import bodyParser from "body-parser";
var ejs = require('ejs');
// import ejs from "ejs"
var cs = require("./functions/create.ts");
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// --------------- Routes --------------------
app.get("/", function (req, res) {
    res.render("home");
});
// ---------------Create---------------------
app.get("/create", function (req, res) {
    res.render("create");
});
app.post("/create", function (req, res) {
    var _a = req.body, stockcode = _a.stockcode, stockname = _a.stockname, quantity = _a.quantity, price = _a.price;
    cs.createStock({ stockcode: stockcode, stockname: stockname, quantity: quantity, price: price });
    // cs.print()
    res.send("Stock created successfully");
});
// ------------------ View ---------------------
app.get("/view", function (req, res) {
    var view = cs.viewAllstocks();
    // console.log(view.rows);
    // res.json(view.rows);
    // cs.print();
});
app.get("update", function (req, res) {
    res.send("Update route");
});
app.get("delete", function (req, res) {
    res.send("Delete route");
});
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
