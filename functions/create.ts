const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'athuldas693',
    database: 'Stock_Master',
    host: 'localhost',
    port: 5432
})

exports.createStock = async function ({ stockcode, ...others }) {
    console.log(stockcode);
    console.log(others.stockname);
    pool.query(`INSERT into "stock_details" VALUES (${stockcode},'${others.stockname}',${others.quantity},${others.price})`);
    // const result = await pool.query (`select * from "stock_details"`);

};

exports.viewAllstocks = async function () {
    const result = await pool.query(`SELECT * FROM "stock_details"`);
    return result.row;
}

exports.deleteStock = async function (stockCode) {
    pool.query(`DELETE from "stock_details" where stock_code=${stockCode}`)
}

