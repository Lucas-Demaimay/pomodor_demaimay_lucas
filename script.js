
/**
 * Permet de mettre un format minute : seconde standard pour tout le site
 * @param {*} minute 
 * @param {*} seconde 
 * @returns une chaîne de caractère "minute:seconde"
 */
function stringTemps( minute, seconde) {
    if(seconde < 10){
        return minute + " : 0" + seconde;
    } else {
        return minute + " : " + seconde;
    }
}

let affichageTemps = document.getElementById("affichageTemps"); // Correspond à l'affichage du minuteur
let affichageTempsTravail = document.getElementById("affichageTempsTravail"); // Correspond à l'affichage du temps de travail choisi
let affichageTempsPause = document.getElementById("affichageTempsPause"); // Correspond à l'affichage du temps de pause choisie
let affichageEstTravail = document.getElementById("celluleTravail"); // Correspond à l'affichage si on est en temps de travail
let affichageEstPause = document.getElementById("cellulePause"); // Correspond à l'affichage si on est en temps de pause

let controle = document.getElementById("boutonControle"); // Correspond au bouton permettant de lancer le minuteur

/*
 * minuteur est un objet représentant le minuteur pomodoro 
 */
const minuteur = { 
    minute : 25, 
    seconde : 0,
    tabTravailRepos: [25, 0, 5, 0],
    estTempsPause: false,
    estActif: false,

    /**
     * Fait avancer le minuteur d'une seconde et les changements qui en découlent
     */
    avancer: function() {
        if(!this.estActif) return;
        this.seconde -= 1;
        if(this.seconde == -1){
            this.seconde = 59;
            
            this.minute -= 1;
            if(this.minute == -1) {
                if(this.estTempsPause) {
                    this.minute = this.tabTravailRepos[0];
                    this.seconde = this.tabTravailRepos[1];
                    this.estTempsPause = false;
                } else {
                    this.minute = this.tabTravailRepos[2];
                    this.seconde = this.tabTravailRepos[3];
                    this.estTempsPause = true;
                }
            }
        }
        this.reafficher();
    },

    /**
     * Réinitialise le minuteur
     */
    restaurer: function() {
        this.estTempsPause = false;
        this.minute = this.tabTravailRepos[0];
        this.seconde = this.tabTravailRepos[1]; 
        this.reafficher();
    },

    /**
     * Réaffiche correctement les minutes et les secondes partout sur la page web
     */
    reafficher: function() {
        
        if(this.estActif) {
            affichageTemps.textContent = stringTemps(this.minute, this.seconde);
        } else {
            affichageTemps.textContent = stringTemps(minuteur.tabTravailRepos[0], minuteur.tabTravailRepos[1]);
        }

        if(this.estActif) {
            if(this.estTempsPause){
                affichageEstPause.classList.remove('inactif')
                affichageEstPause.classList.add('actif')

                affichageEstTravail.classList.remove('actif')
                affichageEstTravail.classList.add('inactif')
                
            } else {
                affichageEstPause.classList.remove('actif')
                affichageEstPause.classList.add('inactif')

                affichageEstTravail.classList.remove('inactif')
                affichageEstTravail.classList.add('actif')
            }
            
        } else {
            affichageEstPause.classList.remove('actif')
            affichageEstPause.classList.add('inactif')

            affichageEstTravail.classList.remove('actif')
            affichageEstTravail.classList.add('inactif')
        }
        
        affichageTempsTravail.textContent = "Temps de travail : " + stringTemps(minuteur.tabTravailRepos[0], minuteur.tabTravailRepos[1]);
        affichageTempsPause.textContent = "Temps de pause : " + stringTemps(minuteur.tabTravailRepos[2], minuteur.tabTravailRepos[3]);

    },


    /**
     * Change les temps de pause et de travail du minuteur
     * @param {*} minute 
     * @param {*} seconde 
     * @param {*} estPause 
     */
    changerTemps: function(minute, seconde, estPause) {
        if(estPause) {
            this.tabTravailRepos[2] = minute;
            this.tabTravailRepos[3] = seconde;
        } else {
            this.tabTravailRepos[0] = minute;
            this.tabTravailRepos[1] = seconde;
        }

        if(!this.estActif) {
            this.minute = this.tabTravailRepos[0];
            this.seconde = this.tabTravailRepos[1];
        }

        this.reafficher();
    }
}


minuteur.reafficher();

setInterval(() => minuteur.avancer(), 1000); // Appelle avancer de minuteur toutes les secondes

/**
 * Permet de lancer le minuteur
 */
function lancer(){
    minuteur.estActif = true;
    controle.innerHTML = "replay";
    controle.onclick = reset;
}

/**
 * Réinitialise le minuteur
 */
function reset(){
    minuteur.estActif = false;
    minuteur.restaurer();
    controle.textContent = "play_arrow";
    controle.onclick = lancer;
}

/**
 * Change le temps de travail
 */
function changerTravail(){
    let newMinute = document.getElementById("choixMinute").textContent;
    let newSeconde = document.getElementById("choixSeconde").textContent;

    minuteur.changerTemps(newMinute, newSeconde, false);
}

/**
 * Change le temps de pause
 */
function changerPause(){
    let newMinute = document.getElementById("choixMinute").textContent;
    let newSeconde = document.getElementById("choixSeconde").textContent;

    minuteur.changerTemps(newMinute, newSeconde, true);
}

/**
 * Augmente les minutes du temps de travail ou pause
 */
function augmenterMinute(){
    let newMinute = document.getElementById("choixMinute").textContent;
    if(newMinute == 120){
        return;
    }
    document.getElementById("choixMinute").textContent = parseInt(newMinute) + 1;
}

/**
 * Diminue les minutes du temps de travail ou pause
 */
function diminuerMinute(){
    let newMinute = document.getElementById("choixMinute").textContent;
    if(newMinute == 1){
        return;
    }
    document.getElementById("choixMinute").textContent = parseInt(newMinute) - 1;
}

/**
 * Augmente les secondes du temps de travail ou pause
 */
function augmenterSeconde(){
    let newSeconde = document.getElementById("choixSeconde").textContent;
    if(newSeconde == 59){
        document.getElementById("choixSeconde").textContent = 0;
        return;
    }
    document.getElementById("choixSeconde").textContent = parseInt(newSeconde) + 1;
}

/**
 * Diminue les secondes du temps de travail ou pause
 */
function diminuerSeconde(){
    let newSeconde = document.getElementById("choixSeconde").textContent;
    if(newSeconde == 0){
        document.getElementById("choixSeconde").textContent = 59;
        return;
    }
    document.getElementById("choixSeconde").textContent = parseInt(newSeconde) - 1;
}


