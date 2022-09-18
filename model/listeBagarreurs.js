const {con} = require('./connectionDatabase')


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