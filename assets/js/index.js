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


function teclaDown(){
    let tecla = event.keyCode;
    // console.log('tecla down clicada');
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

function looping(){
    if(jogo){
        contollerPlayer();
        controllerFire();
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
    velPlayer = 0.3;
    player = document.getElementById("navJog");
    player.style.top = positionyJ + "px";
    player.style.left = positionxJ + "px";
    velFire = 5;
    
    looping();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDown);
document.addEventListener("keyup", teclaUp);
