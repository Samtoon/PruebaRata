
//Se define la tabla de percepción de acción
const conds = [
    newCond(true,true,true,true,0,-1),
    newCond(true,true,true,false,0,-1),
    newCond(true,true,false,true,0,-1),
    newCond(true,true,false,false,0,-1),
    newCond(true,false,true,true,-1,0),
    newCond(true,false,true,false,1,0),
    newCond(true,false,false,true,-1,0),
    newCond(true,false,false,false,-1,0),
    newCond(false,true,true,true,0,-1),
    newCond(false,true,true,false,1,0),
    newCond(false,true,false,true,0,1),
    newCond(false,true,false,false,0,-1),
    newCond(false,false,true,true,1,0),
    newCond(false,false,true,false,1,0),
    newCond(false,false,false,true,0,1)
];

//Se define el ambiente inicial. 0 es libre y 1 obstáculo
var env = [
    [0,0,0,0],
    [0,1,1,2],
    [3,1,0,0],
    [0,0,0,1],
];

const cheese = 2;
const mouse = 3;
var mousePos = {x: 0, y: 2}
var done = false;

//Una función para agilizar la escritura de nuevas percepciones
function newCond(lfree, ufree, rfree, dfree, dx, dy) {
    return {lfree: lfree, ufree: ufree, rfree: rfree, dfree: dfree, dx: dx, dy: dy}
}

//Se definen 4 funciones por cada posible dirección que pueda tomar la rata, indicando si hay o no obstáculos

function leftFree(){
    if(mousePos.x == 0){
        return false
    }
    return env[mousePos.y][mousePos.x-1]!=1;
}
function upFree(){
    if(mousePos.y == 0){
        return false
    }
    return env[mousePos.y-1][mousePos.x]!=1;
}
function rightFree(){
    if(mousePos.x == env.length-1){
        return false
    }
    return env[mousePos.y][mousePos.x+1]!=1;
}
function downFree(){
    if(mousePos.y == env.length-1){
        return false
    }
    return env[mousePos.y+1][mousePos.x]!=1;
}

//Muestra el ambiente

function show(){
    var row;
    var col;
    for (let i = 0; i < env.length; i++){
        switch(i){
            case 0:
                row="A";
                break;
            case 1:
                row="B";
                break;
            case 2:
                row="C";
                break;
            default:
                row="D";
        }
        for (let j=0;j<env[i].length;j++){
            draw(row,j,env[i][j])
        }
    }
}

function draw(row,col,elem){
    id=row+col.toString();
    cell=document.getElementById(id)
    switch(elem){
        case 0:
            cell.innerHTML="";
            break;
        case 1:
            cell.className="blocked-cell"
            break;
        case 2:
            cell.innerHTML="<img src=\"spoon.png\" style=\"width:100%;height:100%\">";
            break;
        case 3:
            cell.innerHTML="<img src=\"Remy.png\" style=\"width:100%;height:100%\">";
            break;
        case 5:
            cell.innerHTML="<img src=\"done.gif\" style=\"width:100%;height:100%\">";
    }
}

//La rata sigue la tabla de percepción y acción e intenta encontrar el queso hasta que da con él o termina un cierto número de iteraciones

function play(){
    show();
    if(env[mousePos.y][mousePos.x]==mouse+cheese){
        env[mousePos.y][mousePos.x]-=cheese
        done = true;
    }
    else{
        var i=0;
        while(  conds[i].lfree!=leftFree()||
                conds[i].ufree!=upFree()||
                conds[i].rfree!=rightFree()||
                conds[i].dfree!=downFree())
                {
                    i++
                }
        env[mousePos.y][mousePos.x]-=mouse;
        mousePos.x+=conds[i].dx;
        mousePos.y+=conds[i].dy;
        env[mousePos.y][mousePos.x]+=mouse;
    }
    env.forEach(show);
    console.log("Next");
    console.log("jeez");
    it++;
}
