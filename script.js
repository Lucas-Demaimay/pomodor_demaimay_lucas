
/**
 * 
 * @param {*} minute 
 * @param {*} seconde 
 * @returns return a string "minute:seconde"
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

    restaurer: function() {
        this.estTempsPause = false;
        this.minute = this.tabTravailRepos[0];
        this.seconde = this.tabTravailRepos[1]; 
        this.reafficher();
    },

    reafficher: function() {
        
        if(this.estActif) {
            affichageTemps.textContent = stringTemps(this.minute, this.seconde);
        } else {
            affichageTemps.textContent = stringTemps(minuteur.tabTravailRepos[0], minuteur.tabTravailRepos[1]);
        }
        
        affichageTempsTravail.textContent = "Temps de travail : " + stringTemps(minuteur.tabTravailRepos[0], minuteur.tabTravailRepos[1]);
        affichageTempsPause.textContent = "Temps de pause : " + stringTemps(minuteur.tabTravailRepos[2], minuteur.tabTravailRepos[3]);

    },

    changerTemps: function(minute, seconde, estPause) {
        if(estPause) {
            this.tabTravailRepos[2] = minute;
            this.tabTravailRepos[3] = seconde;
        } else {
            this.tabTravailRepos[0] = minute;
            this.tabTravailRepos[1] = seconde;
        }

        this.reafficher();
    }
}


minuteur.reafficher();

setInterval(() => minuteur.avancer(), 1000);

function lancer(){
    minuteur.estActif = true;
    controle.textContent = "Reset";
    controle.onclick = reset;
}

function reset(){
    minuteur.estActif = false;
    minuteur.restaurer();
    controle.textContent = "Lancer";
    controle.onclick = lancer;
}

function changerTravail(){
    let newMinute = document.getElementById("choixMinute").value;
    let newSeconde = document.getElementById("choixSeconde").value;

    minuteur.changerTemps(newMinute, newSeconde, false);
}

function changerPause(){
    let newMinute = document.getElementById("choixMinute").value;
    let newSeconde = document.getElementById("choixSeconde").value;

    minuteur.changerTemps(newMinute, newSeconde, true);
}

function augmenterMinute(){
    let newMinute = document.getElementById("choixMinute").value;
    if(newMinute == 120){
        return;
    }
    document.getElementById("choixMinute").value = parseInt(newMinute) + 1;
}

function diminuerMinute(){
    let newMinute = document.getElementById("choixMinute").value;
    if(newMinute == 1){
        return;
    }
    document.getElementById("choixMinute").value = parseInt(newMinute) - 1;
}

function augmenterSeconde(){
    let newSeconde = document.getElementById("choixSeconde").value;
    if(newSeconde == 59){
        document.getElementById("choixSeconde").value = 0;
        return;
    }
    document.getElementById("choixSeconde").value = parseInt(newSeconde) + 1;
}

function diminuerSeconde(){
    let newSeconde = document.getElementById("choixSeconde").value;
    if(newSeconde == 0){
        document.getElementById("choixSeconde").value = 59;
        return;
    }
    document.getElementById("choixSeconde").value = parseInt(newSeconde) - 1;
}


