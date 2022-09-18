const mysql = require('mysql2')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "robot_battle",
    port: 3306
})

function inscription(mail,pseudo,mdp) {
    return new Promise((result, rej) => {
        con.query("INSERT INTO robot (email,pseudo, mdp) VALUES (?,?,?)", [mail, pseudo, mdp], (err, data) => {
            if (err) rej(err);
            else
                result(data);
        });
    });
}

function verif(mail,mdp) {
    return new Promise((result, rej) => {
       con.query("SELECT * FROM robot WHERE email = ? AND mdp = ?", [mail, mdp],  (err, data) => {
        if (err) rej(err);
        else
            result(data);
         });
    });
}


module.exports = {
   inscription,
   verif,

}