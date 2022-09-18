const { render } = require('ejs');
const express = require('express');
const cookieSession = require('cookie-session');
const { inscription, verif} = require("./model/connexion");
const { getAll } = require('./model/listeBagarreurs');
const { getMonRobot, getMesArmes, getMesBoucliers, getMesTenues, vendreItem, getMonBouclierEquipe, getMonArmeEquipe, getMaTenueEquipe, enleverTenue, enleverArme, enleverBouclier, equipeArme, equipeBouclier,equipeTenue} = require('./model/profil');
const { getBoucliers, getArmes, getTenues, objToSac } = require('./model/boutique');
const bagarreur = require('./classe/bagarreur')
const objet = require ('./classe/objet')
const armes = require ('./classe/armes')
const boucliers = require ('./classe/boucliers')
const tenues = require ('./classe/tenues')


const app = express()


app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  60 * 100000
}));

app.set('views', './vues');
app.set('view engine', 'ejs');

app.use(express.static("./assets"))
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
        res.render('connexion');
})

app.get("/inscription", (req, res) => {
    res.render("inscription")
})

app.get("/erreur", (req, res) => {
    res.render("erreur")
})

app.get("/boutique", (req, res) => {
        getBoucliers().then((data) => {
            let lesBoucliers = []
            for (let i in data){
                lesBoucliers.push(new objet(data[i].id_obj, data[i].nom, data[i].type, data[i].modAtt, data[i].modDef, data[i].modEsq, data[i].PV ,data[i].image))        
            }
        getArmes().then((data) => {
                let lesArmes = []
                for (let i in data){
                    lesArmes.push(new objet(data[i].id_obj, data[i].nom, data[i].type, data[i].modAtt, data[i].modDef, data[i].modEsq, data[i].PV ,data[i].image))        
                }
        getTenues().then((data) => {
                    let lesTenues= []
                    for (let i in data){
                        lesTenues.push(new objet(data[i].id_obj, data[i].nom, data[i].type, data[i].modAtt, data[i].modDef, data[i].modEsq, data[i].PV ,data[i].image))        
                    }

          
        res.render("boutique", {lesTenues: lesTenues, lesBoucliers: lesBoucliers,lesArmes : lesArmes, sessionName:req.session.sessionName})     
        })
    })
})


})

app.get('/Add/:idArme', function(req, res) {
    objToSac(req.session.sessionName,req.params.idArme)
    res.redirect('/index');
  });

  app.get('/Arme/:idArme', function(req, res) {
    equipeArme(req.params.idArme,req.session.sessionName)
    res.redirect('/index');
  });

  app.get('/Bouclier/:idBouclier', function(req, res) {
    equipeBouclier(req.params.idBouclier,req.session.sessionName)
    res.redirect('/index');
  });

  app.get('/Tenue/:idTenue', function(req, res) {
    equipeTenue(req.params.idTenue,req.session.sessionName)
    res.redirect('/index');
  });

app.get('/retirerTenue', function(req, res) { 
    enleverTenue(req.session.sessionName)
    res.redirect('/index');
  })

app.get('/retirerArme', function(req, res) { 
    enleverArme(req.session.sessionName)
    res.redirect('/index');
  });


app.get('/retirerBouclier', function(req, res) { 
    enleverBouclier(req.session.sessionName)
    res.redirect('/index');
  });


app.get("/listeBagarreurs", (req, res) => {
    getAll(req.session.sessionName).then((data) => {
        let lesBagarreurs = []
        for (let i in data){
            lesBagarreurs.push(new bagarreur(data[0].email,data[i].pseudo, data[i].force_rbt, data[i].defense ,data[i].esquive ,data[i].pv ,data[i].niveau))   
        }
        
        res.render("listeBagarreurs", {lesBagarreurs: lesBagarreurs, sessionName:req.session.sessionName})
    })
})

app.post("/inscription", function (req, res) {

    if ( req.body.mdp != req.body.verifMdp )  {
        res.redirect(`/erreur`)
    } else {
        inscription(req.body.mail,req.body.pseudo,req.body.mdp )
        res.redirect(`/`)
    }
});


app.post('/', function(req, res) {     
verif(req.body.mail, req.body.mdp).then((rows) => {

        // pas d'utilisateur trouve
        if (rows.length <= 0) {
            res.redirect('/')
        }
        else { 
            req.session.sessionName=rows[0].email;
            res.redirect('/index');   
        }        
   })   
});

app.get("/index", (req, res) => {
        getMonRobot(req.session.sessionName).then((data) => {
             let lesBagarreurs = new bagarreur(data[0].email,data[0].pseudo, data[0].force_rbt, data[0].defense ,data[0].esquive ,data[0].pv ,data[0].niveau, data[0].argent)
                    getMesArmes(req.session.sessionName).then((data) => {
                        let mesArmes= []
                        for (let i in data){
                                mesArmes.push(new armes(data[i].id_obj,data[i].nom, data[i].modAtt, data[i].image))        
                        }
                        getMesBoucliers(req.session.sessionName).then((data) => {
                                    let mesBoucliers= []
                                    for (let i in data){
                                    mesBoucliers.push(new boucliers(data[i].id_obj,data[i].nom, data[i].modDef, data[i].image))        
                                }
                        getMesTenues(req.session.sessionName).then((data) => {
                                    let mesTenues= []
                                    for (let i in data){
                                        mesTenues.push(new tenues(data[i].id_obj,data[i].nom, data[i].modPV, data[i].image))        
                                    }
                        getMonBouclierEquipe(req.session.sessionName).then((data) => {
                            let monBouclier = new boucliers(data[0].id_obj ,data[0].nom, data[0].modDef, data[0].image)
                        getMonArmeEquipe(req.session.sessionName).then((data) => {
                            let monArme = new armes(data[0].id_obj ,data[0].nom, data[0].modAtt, data[0].image)
                        getMaTenueEquipe(req.session.sessionName).then((data) => {
                        let maTenue = new tenues(data[0].id_obj ,data[0].nom, data[0].modPV, data[0].image)       
                        
                        res.render("index", {maTenue : maTenue ,monArme : monArme ,monBouclier: monBouclier ,mesBoucliers: mesBoucliers, mesTenues : mesTenues,mesArmes : mesArmes, lesBagarreurs: lesBagarreurs, sessionName:req.session.sessionName})
                             })
                         })
                     })
                })
             })
         })   
    });
});


app.get('/Vendre/:idArme', function(req, res) {
    vendreItem(req.session.sessionName,req.params.idArme)
    res.redirect('/index');
  });




  app.get('/combat/:robot', function(req, res) { 
    getMonRobot(req.session.sessionName).then((data) => {
        let bagarreur1 = new bagarreur(data[0].email,data[0].pseudo, data[0].force_rbt, data[0].defense ,data[0].esquive ,data[0].pv ,data[0].niveau, data[0].argent)
     getMonRobot(req.params.robot).then((data2) => {
        let bagarreur2 = new bagarreur(data2[0].email, data2[0].pseudo, data2[0].force_rbt, data2[0].defense ,data2[0].esquive ,data2[0].pv ,data2[0].niveau, data2[0].argent)
       let combat = bagarreur1.fight(bagarreur2)
         res.render("combat",  {bagarreur1:bagarreur1, bagarreur2:bagarreur2 ,sessionName:req.session.sessionName, combat: combat})
      //  console.log(combat)

     })
    })
  });

app.get('/logout', function(req, res) {
    req.session = null
    res.redirect('/');
  });







app.listen(3000)