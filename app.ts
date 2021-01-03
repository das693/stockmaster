// const express=require('express');
const express = require('express');
const bodyParser = require('body-parser');
// import bodyParser from "body-parser";
const ejs = require('ejs')
// import ejs from "ejs"

const cs = require("./functions/create.ts")

const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))


// --------------- Routes --------------------

app.get("/", (req, res) => {
    res.render("home")
})

// ---------------Create---------------------

app.get("/create", function (req, res) {
    res.render("create")
});

app.post("/create", function (req, res) {

    const { stockcode, stockname, quantity, price } = req.body;

    cs.createStock({ stockcode, stockname, quantity, price });
    // cs.print()
    res.send("Stock created successfully");

})

// ------------------ View ---------------------

app.get("/view", function (req, res) {

    const view=cs.viewAllstocks();
    
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
app.listen(3000, () => {
    console.log("Server listening on port 3000");
})