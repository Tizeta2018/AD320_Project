let express = require('express');
let router = express.Router();
const mysql = require('mysql2');

// get credentials 
let credentials = require('../credentials.json')

//create database connection
const connection = mysql.createConnection(credentials);

// customers/cartID route
router.get('/:cartID', (req, res, next) => {
  let cartID = req.params.cartID;
  let custCartQuery = 
    `SELECT ITEM_NAME, DESCRIPTION_ITEM, PRICE
    FROM MENU 
    JOIN ITEMS_MENU USING (MENU_ID) 
    JOIN ITEMS USING (ITEM_ID) 
    JOIN CART USING (MENU_ID) 
    WHERE CART_ID = ${cartID};`

    // querry database
  connection.query(custCartQuery, (err, results, fields)=>{
    if (err) throw err;
    res.json(results);
  })
});

// customers/ route
router.get('/', (req, res, next) => {
  let text = 'select * from MENU;'
  res.send('this will be a map of all carts');
});

module.exports = router;
