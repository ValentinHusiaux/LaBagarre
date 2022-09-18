const mysql = require('mysql2')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "robot_battle",
    port: 3306
})


function getAll(mail) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM robot where email != ? " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}


module.exports = {
  getAll
 }