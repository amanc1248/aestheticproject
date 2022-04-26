const { db } = require("../../database/db.js");
const asyncHandler = require("express-async-handler");
// Test employee
const testDb = asyncHandler(async (req, res) => {
  console.log("I ran");
  let sql = "select * from employee;";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

module.exports = { testDb };
