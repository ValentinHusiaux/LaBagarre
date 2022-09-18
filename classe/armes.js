class armes {

    #id_obj
    #nom
    #modAtt
    #image
    constructor (id_obj, nom, modAtt,image) {
        this.#id_obj = id_obj
        this.#nom = nom
        this.#modAtt = modAtt
        this.#image = image

    }
     get id_obj() {
        return this.#id_obj
    }
    get nom() {
        return this.#nom
    }
    get modAtt() {
        return this.#modAtt
    }
    get image() {
        return this.#image
    }
}

module.exports = armes