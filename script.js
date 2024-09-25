
let affichage = document.getElementById("affichageTemps");

let controle = document.getElementById("boutonControle");

const minuteur = { 
    minute : 1, 
    seconde : 0,
    tabTravailRepos: [25, 0, 1, 1],
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
                } else {
                    this.minute = this.tabTravailRepos[2];
                    this.seconde = this.tabTravailRepos[3];
                }
            }
        }
        this.reafficher();
    },

    restaurer: function() {
        this.minute = tabTravailRepos[0];
        this.seconde = tabTravailRepos[1]; 
        this.reafficher();
    },

    reafficher: function() {
        if(this.seconde < 10){
            affichage.textContent = this.minute + " : 0" + this.seconde;
        } else {
            affichage.textContent = this.minute + " : " + this.seconde;
        }
    }
}



affichage.textContent = minuteur.minute + " : 0" + minuteur.seconde;

setInterval(() => minuteur.anvancer(), 1000);

function lancer(){
    minuteur.estActif = true;
}

