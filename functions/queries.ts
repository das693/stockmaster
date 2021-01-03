const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'athuldas693',
    database: 'Stock_Master',
    host: 'localhost',
    port: 5432
})

// Create 
exports.createStock = async function ({ stockcode, ...others }) {
    pool.query(`INSERT into "stock_details" VALUES (${stockcode},'${others.stockname}',${others.quantity},${others.price})`);
    // const result = await pool.query (`select * from "stock_details"`);
};

// View all
exports.viewAllstocks = async function () {
    const result = await pool.query(`SELECT * FROM "stock_details"`);
    return result.rows;
}
// View One
exports.viewOnestock =async function (stockcode) {
    let result = await pool.query(`SELECT * FROM "stock_details" WHERE stock_code=${stockcode}`)
    return result.rows
}

// Delete One
exports.deleteStock = async function (stockCode) {
    pool.query(`DELETE from "stock_details" where stock_code=${stockCode}`)
}

// Update
exports.updateStock=function ({stockcode,...others}) {
    pool.query(`update "stock_details" set stock_name='${others.stockname}',quantity=${others.quantity},total_price=${others.price} where stock_code=${stockcode};
    `)
}

