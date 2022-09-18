class bagarreur {

    #email
    #pseudo
    #force
    #defense
    #esquive
    #pv
    #niveau
    #argent
    constructor (email, ps, f, def, es, pv, niv, arg) {
        this.#email = email
        this.#pseudo = ps
        this.#force = f
        this.#defense = def
        this.#esquive = es 
        this.#pv = pv
        this.#niveau = niv
        this.#argent = arg

    }
    get email() {
        return this.#email
    }
    get pseudo() {
        return this.#pseudo
    }
    get force() {
        return this.#force
    }
    get defense() {
        return this.#defense
    }
    get esquive() {
        return this.#esquive
    }
    get pv() {
        return this.#pv
    }
    get niveau() {
        return this.#niveau
    }
    get argent() {
        return this.#argent
    }
    set email(email) {
         this.#email = email
    }
   set pseudo(pseudo) {
    this.#pseudo = pseudo
    }
    set force(force) {
        this.#force = force
    }
    set defense(defense) {
        this.#defense = defense
    }
    set esquive(esquive) {
        this.#esquive = esquive
    }
    set pv(pv) {
        this.#pv = pv
    }
    set niveau(niveau) {
        this.#niveau = niveau
    }
    set argent(argent) {
        this.#argent = argent
    }
    fight(enemyRobot){
        let robotpv = this.pv
        let enemyRobotpv = enemyRobot.pv
        let message = "";
        let robotTurn = false
        let dodge = false
        let tabDodge = []
        let random = 0;
        let count = 0;
        while((this.pv > 0) && (enemyRobot.pv > 0) && (count<=60)){
            if(robotTurn){
                dodge = false
                message += "Your Turn<br>"
                tabDodge.splice(0, tabDodge.length)
                for(let i=0; i<enemyRobot.esquive; i++){
                    random = this.getRandomIntInclusive(1,100)
                    if(!tabDodge.includes(random)){
                        tabDodge.push(random)
                    }
                    else{
                        i--;
                    }
                }
                random = this.getRandomIntInclusive(1,100)
                if(tabDodge.includes(random)){
                    dodge = true;
                }
                if(dodge){
                    message += "Enemy robot dodge !<br>"
                }
                else{
                    if(enemyRobot.defense < this.force){
                        enemyRobot.pv -= ((+this.force)-(+enemyRobot.defense))
                        message += "Enemy robot lose " + ((+this.force)-(+enemyRobot.defense)) + " pv<br>"
                        message += "Enemy robot has " + enemyRobot.pv +" pv<br>"
                    }
                }
            }
            else{
                message += "Enemy Turn<br>"
                dodge = false
                tabDodge.splice(0, tabDodge.length)
                random = 0;
                for(let i=0; i<this.esquive; i++){
                    random = enemyRobot.getRandomIntInclusive(1,100)
                    if(!tabDodge.includes(random)){
                        tabDodge.push(random)
                    }
                    else{
                        i--;
                    }
                }
                random = enemyRobot.getRandomIntInclusive(1,100)
                if(tabDodge.includes(random)){
                    dodge = true;
                }
                if(dodge){
                    message += "Your robot dodge !<br>"
                }
                else{
                    if(this.defense < enemyRobot.force){
                        this.pv -= ((+enemyRobot.force)-(+this.defense))
                        message += "Your robot lose " + ((+enemyRobot.force)-(+this.defense)) + " pv<br>"
                        message += "Your robot has " + this.pv +" pv<br>"
                    }
                }
            }
            if(enemyRobot.pv <=0){
                message += "You win !<br>"
            }
            else{
                if(this.pv <=0){
                    message += "You lose..<br>"
                }
            }
            robotTurn = !robotTurn;
            count++;
        }
        enemyRobot.pv = enemyRobotpv
        this.pv = robotpv
        return message
    }

getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
 }
}

module.exports = bagarreur