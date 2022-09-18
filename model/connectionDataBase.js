const mysql = require('mysql2')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "robot_battle",
    port: 3306
})


module.exports = {
    con
}