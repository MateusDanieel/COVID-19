//lista de sintomas e suas pontuações
const sintomas = {
    febre:         [0, 16.5, 21.8, 29.1],   
    tosseSeca:     [0, 12.6, 22.5, 16.8],
    fadiga:        [0, 7.0, 9.7, 12.5],   
    tossoCatarro:  [0, 6.1, 8.1, 10.9],  
    faltaAr:       [0, 3.4, 4.6, 6.2],
    dorArticular:  [0, 2.7, 3.6, 4.9],
    dorCabeca:     [0, 2.5, 3.4, 4.6],
    arrepio:       [0, 2.0, 2.7, 3.6],
    nausevomito:   [0, 0.9, 1.2, 1.6],
    narizEntupido: [0, 0.9, 1.2, 1.6],
    diarreia:      [0, 0.7, 0.9, 1.3],
    tosseSangue:   [0, 0.1, 0.2, 0.3],
    olhosInchados: [0, 0.1, 0.2, 0.3],
}
//<<<<<<< HEAD

//=======
//calcula a pontuação que o usuario teve de acordo com os sintomas
//>>>>>>> c4a475aa05a428e1470ce32dddcf86750fdd9713
function calcular(){
    let pontuacao = 0;
    let febre  = 0;
    let faltaAr = 0;
    for(prop in sintomas){
        let indice = document.querySelector(`#${prop}`).value;
        (prop == 'febre' && sintomas[prop][indice] >= 1) ? febre = 1 : false;
        (prop == 'faltaAr' && sintomas[prop][indice] >= 1) ? faltaAr = 1 : false;
        (prop == 'febre' || prop == 'faltaAr') ? pontuacao += sintomas[prop][indice]*1.5 : pontuacao += sintomas[prop][indice];
    }
    return {pontuacao, febre, faltaAr};
}
//<<<<<<< HEAD

//=======
//retorna a probabilidade de estar infectado (Alta, moderada baixa) no html
//>>>>>>> c4a475aa05a428e1470ce32dddcf86750fdd9713
function resultado(){
    let result = calcular();
    if(result.pontuacao >= 70 || (result.febre == 1 && result.faltaAr == 1)){
        document.querySelector().innerHTML('Alta');
    }else if(result.pontuacao >= 35){
        document.querySelector().innerHTML('Moderada');
    }else{
        document.querySelector().innerHTML('Baixa');
    }
}
//retorna um objeto com os sintomas do usuario EX {febre:1, faltaAr:0}
function sintomasUser(){
    let sintomasPresentes = {};
    for(prop in sintomas){
        let indice = document.querySelector(`#${prop}`).value;
        (sintomas[prop][indice] >= 1) ? sintomasPresentes[prop] = 1 : sintomasPresentes[prop] = 0;
    }
    return sintomasPresentes;
}