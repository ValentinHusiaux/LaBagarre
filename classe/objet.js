class objet {

    #id_obj
    #nom
    #type
    #modAtt
    #modDef
    #modEsq
    #modPV
    #image
    constructor (id_obj, nom, type, modAtt, modDef, modEsq, modPV,img) {
        this.#id_obj = id_obj
        this.#nom = nom
        this.#type = type
        this.#modAtt = modAtt
        this.#modDef = modDef
        this.#modEsq = modEsq
        this.#modPV = modPV
        this.#image = img 
    }
    get id_obj() {
        return this.#id_obj
    }
    get nom() {
        return this.#nom
    }
    get type() {
        return this.#type
    }
    get modAtt() {
        return this.#modAtt
    }
    get modDef() {
        return this.#modDef
    }
    get modEsq() {
        return this.#modEsq
    }
    get modPV() {
        return this.#modPV
    }
    get image() {
        return this.#image
    }
}

module.exports = objet