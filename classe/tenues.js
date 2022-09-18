class tenues {

    #id_obj
    #nom
    #modPV
    #image
    constructor (id_obj,nom, modPV,image) {
        this.#id_obj = id_obj
        this.#nom = nom
        this.#modPV = modPV
        this.#image = image
    }
    get id_obj() {
        return this.#id_obj
    }
    get nom() {
        return this.#nom
    }
    get modPV() {
        return this.#modPV
    }
    get image() {
        return this.#image
    }
}

module.exports = tenues