const mysql = require('mysql2')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "robot_battle",
    port: 3306
})


function getMonRobot(mail) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM robot where email = ? " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}


function getMesArmes(mail){
    return new Promise((result, reject) => {
        con.query("select o.id_obj,o.nom,o.modPV, o.image from sac s INNER JOIN objet o on o.id_obj = s.idObjet  INNER join robot r on r.email = s.email  where o.type = 'arme'  and s.email = ? and id_arme <> idObjet  " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function getMesBoucliers(mail){
    return new Promise((result, reject) => {
        con.query("select o.id_obj,o.nom,o.modPV, o.image from sac s INNER JOIN objet o on o.id_obj = s.idObjet  INNER join robot r on r.email = s.email  where o.type = 'bouclier'  and s.email = ? and id_bouclier <> idObjet " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function getMesTenues(mail){
    return new Promise((result, reject) => {
        con.query("select o.id_obj,o.nom,o.modPV, o.image from sac s INNER JOIN objet o on o.id_obj = s.idObjet  INNER join robot r on r.email = s.email  where o.type = 'tenue'  and s.email = ? and id_tenue <> idObjet " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function vendreItem(mail,idObjet) {
    return new Promise((result, reject) => {
        con.query("Delete from sac where email = ? and idObjet = ? " ,[mail, idObjet], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function getMonBouclierEquipe(mail){
    return new Promise((result, reject) => {
        con.query("select r.id_bouclier, o.nom, o.modAtt, o.image from robot r  INNER JOIN sac s on s.idObjet = r.id_bouclier   INNER JOIN objet o on o.id_obj = s.idObjet  where r.email = ?   " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function getMonArmeEquipe(mail){
    return new Promise((result, reject) => {
        con.query("select r.id_arme, o.nom, o.modAtt, o.image from robot r  INNER JOIN sac s on s.idObjet = r.id_Arme   INNER JOIN objet o on o.id_obj = s.idObjet  where r.email = ?   " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}


function getMaTenueEquipe(mail){
    return new Promise((result, reject) => {
        con.query("select r.id_tenue, o.nom, o.modAtt, o.image from robot r  INNER JOIN sac s on s.idObjet = r.id_Tenue   INNER JOIN objet o on o.id_obj = s.idObjet  where r.email = ?   " , [mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

// faire un update des objet equipe update set null
function enleverBouclier(mail,idObjet) {
    return new Promise((result, reject) => {
        con.query("UPDATE robot SET id_bouclier = 0 WHERE email = ?" ,[mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function enleverArme(mail,idObjet) {
    return new Promise((result, reject) => {
        con.query("UPDATE robot SET id_arme = 0 WHERE email = ?" ,[mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function enleverTenue(mail,idObjet) {
    return new Promise((result, reject) => {
        con.query("UPDATE robot SET id_tenue = 0 WHERE email = ?" ,[mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}


function equipeArme(id_obj,mail) {
    return new Promise((result, reject) => {
        con.query("UPDATE robot SET id_arme = ? where email = ?", [id_obj,mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function equipeBouclier(id_obj,mail) {
    return new Promise((result, reject) => {
        con.query("UPDATE robot SET id_bouclier = ? where email = ?", [id_obj,mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

function equipeTenue(id_obj,mail) {
    return new Promise((result, reject) => {
        con.query("UPDATE robot SET id_tenue  = ? where  email = ? ", [id_obj,mail], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}



module.exports = {
    getMonRobot,
    getMesArmes,
    getMesBoucliers,
    getMesTenues,
    vendreItem,
    getMonBouclierEquipe,
    getMonArmeEquipe,
    getMaTenueEquipe,
    enleverBouclier,
    enleverArme,
    enleverTenue,
    equipeArme,
    equipeBouclier,
    equipeTenue
   }