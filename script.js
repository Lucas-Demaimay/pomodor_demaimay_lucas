
let affichage = document.getElementById("affichageTemps");

let controle = document.getElementById("boutonControle");

const minuteur = { 
    minute : 25, 
    seconde : 0,
    tabTravailRepos: [25, 0, 5, 0],
    estTempsPause: false,
    estActif: false,

    anvancer: function() {
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
        if(this.seconde < 10){
            affichage.textContent = this.minute + " : 0" + this.seconde;
        } else {
            affichage.textContent = this.minute + " : " + this.seconde;
        }

        if(this.estTempsPause){
            document.body.style.backgroundColor = "GREEN";
        } else {
            document.body.style.backgroundColor = "RED";
        }

        if(!this.estActif){
            document.body.style.backgroundColor = "WHITE";
        }
    }
}

affichage.textContent = minuteur.minute + " : 0" + minuteur.seconde;

setInterval(() => minuteur.anvancer(), 1000);

function lancer(){
    minuteur.estActif = true;
    document.body.style.backgroundColor = "RED";
    controle.textContent = "Reset";
    controle.onclick = reset;
}

function reset(){
    minuteur.estActif = false;

    minuteur.restaurer();

    controle.textContent = "Lancer";
    controle.onclick = lancer;
}

