let barraPlaneta = document.getElementById("barraPlaneta");
let statusPlaneta = document.getElementById("statusPlaneta");
let placarPlaneta = document.getElementById("placar");
let allBomb = document.getElementById("bombasRestante");
let playerAgain = document.querySelector(".teste");
let msgFinal = document.querySelector("#msgFinal");
let telaMsg = document.querySelector("#telaMsg");
let directionxJ;
let directionyJ;
let jogo;
let frames;
let positionxJ;
let positionyJ;
let telaWidth;
let telaHeight;
let player;
let velPlayer;
let velFire;
let velAsteroid;
let timeBomba;
let qntBombas;
let lifePlaneta;
let pontuation;


function teclaDown(){
    let tecla = event.keyCode;
    if(tecla == 38){
        directionyJ += -1;
    } else if(tecla == 40){
        directionyJ += 1;
    }

    if(tecla == 37){
        directionxJ += -1;
    }else if(tecla == 39){
        directionxJ += 1;
    }

    if(tecla == 32){
        onFire(positionxJ ,positionyJ)
    }
}

function teclaUp(){
    // console.log('tecla up clicada');
    let tecla = event.keyCode;

    if((tecla == 38) || (tecla == 40)){
        directionyJ += 0;
    }  
    if((tecla == 37) || (tecla == 39)){
        directionxJ += 0;
    }
}

function onFire(x, y){
    let creationFire = document.createElement("div");
    creationFire.setAttribute("class", "drawnFire");
    creationFire.setAttribute("style", `top: ${y}px; left: ${x}px`);
    
    document.body.appendChild(creationFire);
    
}

function controllerFire(){
    let fires = document.getElementsByClassName("drawnFire");
    let tamFire = fires.length;
    
    for(let i = 0; i < tamFire; i++) {
        if(fires[i]){
            let ptFire = fires[i].offsetTop;
            ptFire -= velFire;
            fires[i].style.top = `${ptFire}px`;
            destroyAsteroid(fires[i]);
        if(ptFire < 0){
            fires[i].remove();
        }
    }
    }

}
function contollerPlayer(){

    positionyJ += directionyJ * velPlayer;
    positionxJ += directionxJ * velPlayer;
    player.style.top = positionyJ + "px";
    player.style.left = positionxJ + "px";
}

function creationAsteroid(){
    if(jogo){
        let numRandom = Math.random() * telaWidth;
        let asteroid = document.createElement("div");
        asteroid.setAttribute('class', 'asteroidForm');
        asteroid.setAttribute("style", `left: ${numRandom}px`)
        document.body.appendChild(asteroid);
        qntBombas--;
        allBomb.textContent = `Bombas Restantes = ${qntBombas}`

        if(qntBombas <= 0 && barraPlaneta.style.width >= 0){
            msgFinal.textContent = "Meus parabens você conseguiu salvar o planeta!"
            jogo = false;
            playerAgain.style.display = "flex";
        }
    }
}

function controllerAsteroid(){
   
    let allAsteroid = document.getElementsByClassName("asteroidForm");
    let tamAsteroid = allAsteroid.length;

    for(let i = 0; i < tamAsteroid; i++) {
        if(allAsteroid[i]){
            let ptAsteroid = allAsteroid[i].offsetTop;
            ptAsteroid += velAsteroid;
            allAsteroid[i].style.top = `${ptAsteroid}px`;
    
        if(ptAsteroid > telaHeight){
            allAsteroid[i].remove();
            lifePlaneta -= 16.6;
            statusPlaneta.textContent = `Vida do Planeta: ${lifePlaneta.toFixed(2)}/250`;
            barraPlaneta.style.width = `${lifePlaneta}px`
            if(lifePlaneta <= 0){
                statusPlaneta.textContent = 'Vida do Planeta: 0/250';
                jogo = false;
                msgFinal.textContent = "Não foi dessa vez, tente mais uma vez!"
                playerAgain.style.display = "flex";
            }
        }
    }
    }
}

function destroyAsteroid(fire){
    let allAsteroid = document.getElementsByClassName("asteroidForm");
    let tamAsteroid = allAsteroid.length;
    for(let i = 0; i < tamAsteroid; i++){
        if(allAsteroid[i]){
            if(
                //lado de baixo do asteroide com a ponta do tiro e lado de baixo do tiro com lado de cima da bomba
                ((fire.offsetTop) <= (allAsteroid[i].offsetTop + 60)) && ((fire.offsetTop + 8) >= (allAsteroid[i].offsetTop))
                &&
                //esquerda tiro com direita da bomba e direita tiro com esquerda da bomba
                (fire.offsetLeft <= (allAsteroid[i].offsetLeft + 60)) && ((fire.offsetLeft + 8) >= (allAsteroid[i].offsetLeft))
            ){
            
                pontuation += 1
                placarPlaneta.textContent = `Placar = ${pontuation}`;
                allAsteroid[i].remove();
                fire.remove();
            }
        
            }
        }
}
function looping(){
    if(jogo){
        contollerPlayer();
        controllerFire();
        controllerAsteroid();
        
    } 
    frames = requestAnimationFrame(looping);

}

function inicia(){
    jogo = true;

    telaWidth = window.innerWidth;
    telaHeight = window.innerHeight;
    directionxJ = 0;
    directionyJ = 0;
    positionxJ = telaWidth / 2;
    positionyJ = telaHeight / 2;
    velPlayer = 0.5;
    player = document.getElementById("navJog");
    player.style.top = positionyJ + "px";
    player.style.left = positionxJ + "px";
    velFire = 5;
    velAsteroid = 1;
    lifePlaneta = 250;
    qntBombas = 150;
    pontuation = 0;

    statusPlaneta.textContent = 'Vida do Planeta: 250';
    placarPlaneta.textContent = `Placar = ${pontuation}`;
    allBomb.textContent = `Bombas Restantes = ${qntBombas}`;

    clearInterval(timeBomba);
    looping();
   
      
       
    
}
function atualization(){
    location.reload();
}
function startGame(){
     telaMsg.style.display = "none"
     timeBomba = setInterval(creationAsteroid, 800);
}
window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDown);
document.addEventListener("keyup", teclaUp);
