/*const url = 'https://api.brasil.io/v1/dataset/covid19/caso_full/data/';
const params = {
    method:'GET',
    headers: new Headers({
        'Authorization': 'Token 53b9ab846849dfe45f293eabd8f9ab997840c83a', 
    }),
}

fetch(url, params)
    .then((r)=>r.json())
    .then((json)=>{
        console.log(json);
    });
*/


async function requisitar() {
    const url = 'https://api.brasil.io/v1/dataset/covid19/caso/data/?format=json&is_last=True&place_type=state';
    const params = {
        method:'GET',
        headers: new Headers({
            'Authorization': 'Token 53b9ab846849dfe45f293eabd8f9ab997840c83a', 
        }),
    }

    const r = await fetch(url, params);
    const json = await r.json();

    var texto = JSON.stringify(json.results);
    var obj = JSON.parse(texto);

    

    console.log(obj)
    
}

requisitar();





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
    contViag:[0,20]
}

//calcula a pontuação que o usuario teve de acordo com os sintomas
function calcular(){
    let pontuacao = 0;
    let febre  = 0;
    let faltaAr = 0;
    
    for(let prop in sintomas){
        var radios = document.getElementsByName(`${prop}`);
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                var indice = radios[i].value-1;
                break;
            }           
        }
        (prop == 'febre' && sintomas[prop][indice] >= 1) ? febre = 1 : false;
        (prop == 'faltaAr' && sintomas[prop][indice] >= 1) ? faltaAr = 1 : false;
        (prop == 'febre' || prop == 'faltaAr') ? pontuacao += sintomas[prop][indice]*1.5 : pontuacao += sintomas[prop][indice];
 
    }

    return {pontuacao, febre, faltaAr};
}

//retorna a probabilidade de estar infectado (Alta, moderada baixa) no html
function resultado(){
    let result = calcular();

    if(result.pontuacao >= 70 || (result.febre == 1 && result.faltaAr == 1)){
        document.querySelector('.box-res').innerHTML = "<div class='danger'><h1>Risco: Alto</h1><p>De acordo com as suas respostas, é possível que você se enquadre como caso suspeito de COVID-19. É importante ressaltar que isso <b>NÃO</b> se trata de um diagnóstico.</p><p>Recomendamos que você siga as orientações dos órgãos de saúde e procure atendimento médico em uma unidade de saúde próxima da sua residência o mais rápido possível.</p></div>";
    } else if(result.pontuacao >= 35){
        document.querySelector('.box-res').innerHTML = "<div class='warning'><h1>Risco: Moderado</h1><p>De acordo com as suas respostas, você tem chances moderadas de se enquadrar como caso suspeito de COVID-19. É importante ressaltar que isso <b>NÃO</b> se trata de um diagnóstico.</p><p>Recomendamos que você siga as orientações dos órgãos de saúde e procure atendimento médico em uma unidade de saúde próxima da sua residência caso os sintomas fiquem mais severos.</p></div>";
    } else{
        document.querySelector('.box-res').innerHTML = '<div class="success"><h1>Risco: Baixo</h1><p>De acordo com as suas respostas, você tem chances baixas de se enquadrar como caso suspeito de COVID-19. É importante ressaltar que isso <b>NÃO</b> se trata de um diagnóstico.</p><p>Recomendamos que você siga as orientações dos órgãos de saúde e procure atendimento médico somente caso os sintomas fiquem mais severos.</p></div>';
    }
}

//retorna um objeto com os sintomas do usuario EX {febre:1, faltaAr:0}
function sintomasUser(){
    let sintomasPresentes = {};
    
    for(prop in sintomas){
        var radios = document.getElementsByName(`${prop}`);
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                var indice = radios[i].value-1;
                (sintomas[prop][indice] >= 1) ? sintomasPresentes[prop] = 1 : sintomasPresentes[prop] = 0;
            }
        }
    }
    return sintomasPresentes;
}