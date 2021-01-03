// const express=require('express');
const express = require('express');
const bodyParser = require('body-parser');
// import bodyParser from "body-parser";
const ejs = require('ejs')
// import ejs from "ejs"

const cs = require("./functions/queries.ts")

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

// ----------------View ---------------------

app.get("/view", async function (req, res) {
    let result = await cs.viewAllstocks()
    res.json(result)
});

app.get("/view/:stockCode", async function (req, res) {
    let stockcode = req.params.stockCode;
    let viewOne = await cs.viewOnestock(stockcode);
    res.json(viewOne);
})


app.get("/update", function (req, res) {
    res.send("Update route");
});

// ------------- Delete ----------------

app.get("/delete", function (req, res) {
    res.render("delete");
});

app.post("/delete", async function (req, res) {
    const stockCode = req.body.stockcode;
    await cs.deleteStock(stockCode);
    await res.send("Stock deleted successfully")
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})