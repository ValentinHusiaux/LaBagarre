const {con} = require('./connectionDatabase')


// pour les armes
function getArmes() {
    return new Promise((result, reject) => {
        con.query("SELECT * from objet where type = 'Arme' and id_obj not in (select idObjet from sac)", (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

// pour les boucliers
function getBoucliers() {
    return new Promise((result, reject) => {
        con.query("SELECT * from objet where type = 'Bouclier' and id_obj not in (select idObjet from sac)", (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}



// pour les tenues
function getTenues() {
    return new Promise((result, reject) => {
        con.query("SELECT * from objet where type = 'Tenue' and id_obj not in (select idObjet from sac)", (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}


// Ajout de l'objet depuis la boutique dans le sac
function objToSac(mail,id_obj) {
    return new Promise((result, reject) => {
        con.query("INSERT INTO sac (email,idObjet) VALUES (?,?)", [mail,id_obj], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}



module.exports = {
    getBoucliers,
    getArmes,
    getTenues,
    objToSac
   }